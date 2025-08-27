import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "./db/index.js";
import { todosTable } from "./db/schema.js";
import { ilike } from "drizzle-orm";
import readlineSync from "readline-sync";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ========== TOOLS ==========
async function getAllTodos() {
  const todos = await db.select().from(todosTable);
  return todos;
}

async function createTodo(todo) {
  const [result] = await db
    .insert(todosTable)
    .values({ todo })
    .returning({ id: todosTable.id });
  return result.id;
}

async function searchTodo(search) {
  const todos = await db
    .select()
    .from(todosTable)
    .where(ilike(todosTable.todo, `%${search}%`));
  return todos;
}

async function deleteTodoById(id) {
  await db.delete().from(todosTable).where(todosTable.id.equals(id));
}

const tools = {
  getAllTodos,
  createTodo,
  deleteTodoById,
  searchTodo,
};

// ========== SYSTEM PROMPT ==========
const SYSTEM_PROMPT = `
You are an AI To-Do List Assistant with START, PLAN, ACTION, Observation and Output State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation.
Once you get the observations, Return the AI response based on START prompt and observations.
You can manage tasks by adding, viewing, updating, and deleting them.
You must strictly follow the JSON output format.

Todo DB Schema: id: Int (Primary Key), todo: String, created_at: DateTime, updated_at: DateTime

Available Tools:
- getAllTodos()
- createTodo(todo: string)
- deleteTodoById(id: string)
- searchTodo(query: string)

START
{ "type": "user", "user": "Add a task for shopping groceries." }
{ "type": "plan", "plan": "I will try to get more context on what user needs to shop." }
{ "type": "output", "output": "Can you tell me what all items you want to shop for?" }
{ "type": "user", "user": "I want to shop for milk, kurkure, lays and choco." }
{ "type": "plan", "plan": "I will use createTodo to create a new Todo in DB." }
{ "type": "action", "function": "createTodo", "input": "Shopping for milk, kurkure, lays and choco." }
{ "type": "observation", "observation": "2" }
{ "type": "output", "output": "Your todo has been added successfully" }
`;

const messages = [{ role: "user", parts: [{ text: SYSTEM_PROMPT }] }];

// ========== CHAT LOOP ==========
while (true) {
  const query = readlineSync.question(">> ");
  const userMessage = {
    role: "user",
    parts: [{ text: JSON.stringify({ role: "user", content: query }) }],
  };
  messages.push(userMessage);

  while (true) {
    const chat = await model.generateContent({
      contents: messages,
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = chat.response.text();
    messages.push({ role: "model", parts: [{ text: result }] });

    const action = JSON.parse(result);

    if (action.type === "output") {
      console.log(`AI>> ${action.output}`);
      break;
    } else if (action.type === "action") {
      const fn = tools[action.function];
      if (!fn) throw new Error("Invalid Tool Call");
      const observation = await fn(action.input);
      const observationMessage = {
        role: "user",
        parts: [
          {
            text: JSON.stringify({
              type: "observation",
              observation,
            }),
          },
        ],
      };
      messages.push(observationMessage);
    }
  }
}
