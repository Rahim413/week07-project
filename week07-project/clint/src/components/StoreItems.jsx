import React, { useEffect, useState } from 'react';
import './StoreItems.css';
import Header from './Header';

export default function StoreItems() {
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState({ name: '', barcode: '', price: '', quantity_in_stock: '' }); 
  const [successMessage, setSuccessMessage] = useState(''); 
  
  useEffect(() => {
    async function fetchItems() {
      const response = await fetch('https://week07-project-server.onrender.com/items');
      const data = await response.json();
      setItems(data); 
    }

    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
     
      const response = await fetch('https://week07-project-server.onrender.com/add-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      const addedItem = await response.json(); 
      console.log('Added item:', addedItem); 
      setItems([addedItem]); 
      setNewItem({ name: '', barcode: '', price: '', quantity_in_stock: '' }); 
      setSuccessMessage('Item is stored successfully!');

  };

  return (
    <div>
      <Header /> 
      <div className="store-items-container">
        <form onSubmit={handleSubmit} className="add-item-form">
          <h2>Store New Item</h2>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Barcode"
            value={newItem.barcode}
            onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity in Stock"
            value={newItem.quantity_in_stock}
            onChange={(e) => setNewItem({ ...newItem, quantity_in_stock: e.target.value })}
            required
          />
          <button type="submit">Add Item</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}

      </div>
    </div>
  );
}
