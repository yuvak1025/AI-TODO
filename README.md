# 🧠 AI-TODO: Intelligent To-Do List Assistant  

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)  
[![npm](https://img.shields.io/badge/npm-v10+-red?logo=npm)](https://www.npmjs.com/)  
[![Google Gemini](https://img.shields.io/badge/Google-Gemini-blue?logo=google)](https://ai.google.dev/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blue?logo=postgresql)](https://www.postgresql.org/)  
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-orange)](https://orm.drizzle.team/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  

---

## 🚀 Features  
- 📌 Add tasks with natural language.  
- 🔍 Search todos quickly.  
- 📂 View all todos in the database.  
- ❌ Delete tasks by ID.  
- 🧠 AI plans actions, executes with tools, observes results, and outputs structured responses.  
- 🗂️ Follows **strict JSON response format** for reliability.  

---

## 🛠️ Tech Stack  
- **Node.js (ES Modules)**  
- **Google Generative AI (Gemini-1.5-Flash)**  
- **Drizzle ORM** + PostgreSQL  
- **readline-sync** (CLI interaction)  
- **dotenv** for configuration  

---

## 📂 Database Schema  

```sql
todosTable {
  id          Int (Primary Key)
  todo        String
  created_at  DateTime
  updated_at  DateTime
}

## ⚙️ Available Tools
getAllTodos()          // Fetch all todos
createTodo(todo)       // Add a new todo
deleteTodoById(id)     // Delete a todo
searchTodo(query)      // Search todos by keyword
```
---

## 📖 AI Workflow
- { "type": "user", "user": "Add a task for shopping groceries." }
- { "type": "plan", "plan": "I will try to get more context on what user needs to shop." }
- { "type": "output", "output": "Can you tell me what all items you want to shop for?" }
- { "type": "user", "user": "I want to shop for milk, kurkure, lays and choco." }
- { "type": "plan", "plan": "I will use createTodo to create a new Todo in DB." }
- { "type": "action", "function": "createTodo", "input": "Shopping for milk, kurkure, lays and choco." }
- { "type": "observation", "observation": "2" }
- { "type": "output", "output": "Your todo has been added successfully" }


## 🧑‍💻 Project Flow
flowchart TD
    A[User Prompt] --> B[PLAN]
    B --> C[ACTION]
    C --> D[Observation]
    D --> E[OUTPUT]
    E -->|Loop| A

##
<img width="1364" height="421" alt="Screenshot 2025-08-28 000156" src="https://github.com/user-attachments/assets/d5e8c4c7-e8eb-462e-a60f-3f777b1959e0" />

