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
