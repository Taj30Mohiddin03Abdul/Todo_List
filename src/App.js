import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium"); // ✅ new state for priority
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedPriority, setEditedPriority] = useState("Medium"); // ✅ new state for edit priority

  // ✅ Fetch tasks from backend
  useEffect(() => {
    axios.get("/tasks").then(res => setTodos(res.data));
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { text: task, time: new Date().toLocaleString(), priority };
    axios.post("/tasks", newTask).then(res => {
      setTodos([...todos, res.data]);
      setTask("");
      setPriority("Medium"); // reset dropdown
    });
  };

  const toggleTask = (id, completed, text, time, priority) => {
    axios.put(`/tasks/${id}`, { text, completed: !completed, priority }).then(() => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    });
  };

  const deleteTask = (id) => {
    axios.delete(`/tasks/${id}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  const startEditing = (id, text, priority) => {
    setEditingId(id);
    setEditedText(text);
    setEditedPriority(priority);
  };

  const saveEdit = (id, completed, time) => {
    axios.put(`/tasks/${id}`, { text: editedText, completed, priority: editedPriority }).then(() => {
      setTodos(
        todos.map(todo =>
          todo.id === id
            ? { ...todo, text: editedText, priority: editedPriority }
            : todo
        )
      );
      setEditingId(null);
      setEditedText("");
      setEditedPriority("Medium");
    });
  };

  return (
    <div className="app">
      <h1>My Todo List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {editingId === todo.id ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button onClick={() => saveEdit(todo.id, todo.completed, todo.time)}>💾 Save</button>
              </div>
            ) : (
              <div
                className="task-content"
                onClick={() =>
                  toggleTask(todo.id, todo.completed, todo.text, todo.time, todo.priority)
                }
              >
                <span>{todo.text}</span>
                <small>{todo.time} | Priority: <b>{todo.priority}</b></small>
              </div>
            )}
            <div className="actions">
              <button onClick={() => startEditing(todo.id, todo.text, todo.priority)}>✏️</button>
              <button onClick={() => deleteTask(todo.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
