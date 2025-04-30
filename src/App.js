import React, { useState } from 'react';
import './styles.css';

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 70000 },
  { id: 2, name: 'Mouse', category: 'Electronics', price: 700 },
  { id: 3, name: 'Keyboard', category: 'Electronics', price: 1500 },
  { id: 4, name: 'Monitor', category: 'Electronics', price: 12000 },
  { id: 5, name: 'Printer', category: 'Electronics', price: 8000 },
  { id: 6, name: 'Desk', category: 'Furniture', price: 5000 },
  { id: 7, name: 'Office Chair', category: 'Furniture', price: 3500 },
  { id: 8, name: 'Bookshelf', category: 'Furniture', price: 4000 },
  { id: 9, name: 'Filing Cabinet', category: 'Furniture', price: 4500 },
  { id: 10, name: 'Pen Pack', category: 'Stationery', price: 200 },
  { id: 11, name: 'Notebook', category: 'Stationery', price: 150 },
  { id: 12, name: 'Sticky Notes', category: 'Stationery', price: 100 },
  { id: 13, name: 'Whiteboard', category: 'Office Supplies', price: 2500 },
  { id: 14, name: 'Projector', category: 'Electronics', price: 30000 },
  { id: 15, name: 'Extension Cord', category: 'Electronics', price: 400 },
  { id: 16, name: 'Router', category: 'Electronics', price: 2500 },
  { id: 17, name: 'Scissors', category: 'Stationery', price: 100 },
  { id: 18, name: 'Paper Ream', category: 'Stationery', price: 500 },
  { id: 19, name: 'Stapler', category: 'Stationery', price: 300 },
  { id: 20, name: 'USB Drive', category: 'Electronics', price: 1000 },
];

function App() {
  const [inventory, setInventory] = useState([]);
  const [showItemPanel, setShowItemPanel] = useState(false);

  const handleAddItem = (item) => {
    const newItem = { ...item, quantity: 1, addedAt: new Date().toLocaleString() };
    setInventory(prevInventory => [...prevInventory, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    setInventory(updatedInventory);
  };

  // Correct total bill calculation
  const totalBill = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">📦</div>
          <div>
            <h1 className="title">Inventory Management System</h1>
            <p className="subtitle">Efficient. Reliable. Organized.</p>
          </div>
        </div>
      </header>

      <main className="main">
        <button className="add-button" onClick={() => setShowItemPanel(!showItemPanel)}>
          {showItemPanel ? 'Close Item List' : 'Add Item'}
        </button>

        <div className={`side-panel ${showItemPanel ? 'open' : ''}`}>
          <h3>Select Item to Add</h3>
          {items.map((item) => (
            <div key={item.id} className="item-card" onClick={() => handleAddItem(item)}>
              <strong>{item.name}</strong>
              <span>{item.category}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>

        <section className="inventory-section">
          <h2>Current Inventory</h2>
          {inventory.length === 0 ? (
            <p className="empty">No items added yet. Click "Add Item" to begin.</p>
          ) : (
            <>
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price (₹)</th>
                    <th>Quantity</th>
                    <th>Amount (₹)</th>
                    <th>Added At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price * item.quantity}</td>
                      <td>{item.addedAt}</td>
                      <td>
                        <button className="remove-button" onClick={() => handleRemoveItem(idx)}>
                          ❌ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="total-bill">
                <h3>🧾 Overall Total Bill: ₹{totalBill}</h3>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
