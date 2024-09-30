import React, { useState } from 'react';
import './SearchItems.css';
import Header from './Header';

export default function SearchItems() {
  const [barcode, setBarcode] = useState(''); 
  const [searchedItem, setSearchedItem] = useState(null); 
  const [error, setError] = useState(''); 
 
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSearchedItem(null);
   

    try {
      const response = await fetch(`https://week07-project-server.onrender.com/search-item?barcode=${barcode}`);
      if (!response.ok) throw new Error('Item not found');
      const item = await response.json(); 
      setSearchedItem(item);
    } catch (err) {
      setError(err.message);  
    }
  };

  return (
    <div>
      <Header />
      <div className="search-items-container">
        <h2>Search Stored Item by Barcode</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
        <p className="error-message">{error}</p>
        {searchedItem && (
          <div className="searched-item">
            <h3>{searchedItem.name}</h3>
            <p>Barcode: {searchedItem.barcode}</p>
            <p>Price: £{searchedItem.price}</p>
            <p>Stock: {searchedItem.quantity_in_stock}</p>
          </div>
        )}
      </div>
    </div>
  );
}