import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('https://grocery-app-backend-cgf6.onrender.com');
    const data = await response.json();
    setItems(data);
  };

  const addItem = async () => {
    if (input.trim() === '') return;
    const response = await fetch('https://grocery-app-backend-cgf6.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input })
    });
    const newItem = await response.json();
    setItems([...items, newItem]);
    setInput('');
  };

  const deleteItem = async (id) => {
    await fetch(`https://grocery-app-backend-cgf6.onrender.com/items/${id}`, {
      method: 'DELETE'
    });
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div className="App">
      <h1>Groove List</h1>
      <p className="subtitle">✦ Keep it funky ✦</p>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add something groovy..."
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <button className="add-btn" onClick={addItem}>Add it</button>
      </div>

      <div className="main-layout">
        <ul>
          {items.length === 0 && (
            <p className="empty-message">Your list is empty baby!</p>
          )}
          {items.map((item) => (
            <li key={item._id}>
              {item.name}
              <button className="delete-btn" onClick={() => deleteItem(item._id)}>✕ Ditch it</button>
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <div className="sidebar">
            <h2>🛒 My List</h2>
            <ol>
              {items.map((item) => (
                <li key={item._id}>{item.name}</li>
              ))}
            </ol>
            <p className="total">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;