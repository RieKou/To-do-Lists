import React, { useState } from 'react';
import './App.css';

const initialTodolist = [
  { 
    id: 1, 
    task: 'Learn React', 
    checked: false
  },
];

function App() {
  const [todolist, setTodolist] = useState(initialTodolist);
  const [newTask, setNewTask] = useState('');

  const handleToggle = (id) => {
    setTodolist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = (id) => {
  const taskToDelete = todolist.find(item => item.id === id);
  setTodolist(prev => prev.filter(item => item.id !== id));
  alert(`Task "${taskToDelete.task}" berhasil dihapus!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTodo = {
      id: Date.now(),
      task: newTask.trim(),
      checked: false
    };

    setTodolist(prev => [...prev, newTodo]);
    alert('Task berhasil ditambahkan!');
    setNewTask('');
  };

  return (
    <>
      <h1>[BETA]</h1>
      <h1>To-do List</h1>

      <form className="append" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todolist.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: 'gray' }}>
            Kosong cuy
          </p>
        ) : (
          todolist.map((item) => (
            <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
              />
              <span style={item.checked ? { textDecoration: 'line-through' } : {}}>
                {item.task}
              </span>
              <button onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }}>
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default App;
