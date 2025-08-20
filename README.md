📝 To-Do List App

A full-stack To-Do List Application built with React.js, Node.js (Express), and MySQL.
This app allows users to add, edit, and delete tasks, with data persisted in a MySQL database.

🚀 Features

✅ Add new tasks

✏️ Edit existing tasks

❌ Delete tasks

💾 Data stored in MySQL database

🔗 Frontend (React) connected to Backend (Express API)

🛠️ Tech Stack

Frontend: React.js, Axios

Backend: Node.js, Express.js, CORS, Body-Parser

Database: MySQL (via mysql2 package)

📂 Project Structure
todo-app/
│
├── todo-backend/     # Express server + API
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── todo-frontend/    # React app
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/todo-app.git
cd todo-app

2️⃣ Backend Setup
cd todo-backend
npm install


Create a MySQL database:

CREATE DATABASE todo_db;
USE todo_db;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);


Start the backend:

node server.js


➡️ Runs at http://localhost:5000

3️⃣ Frontend Setup

Open a new terminal:

cd todo-frontend
npm install
npm start


➡️ Runs at http://localhost:3000

🔗 API Endpoints
Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Add new task
PUT	/tasks/:id	Update task by ID
DELETE	/tasks/:id	Delete task by ID
📸 Screenshots (Optional)

Add your app screenshots here

🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss.
