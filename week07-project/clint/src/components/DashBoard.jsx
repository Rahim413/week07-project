import React from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';
import Header from './Header';

export default function DashBoard() {
  return (
    <div>
      <Header /> 
    <div className="dashboard-body">
      <div className="dashboard-container">
        <div className="flex-box">
          <Link to="/items">Store Items</Link>
        </div>
        <div className="flex-box">
          <Link to="/search">Search Items</Link>
        </div>
        <div className="flex-box">
          <Link to="/checkout">Checkout</Link>
        </div>
        <div className="flex-box">
          <Link to="/sales">Sales Reports</Link>
        </div>
        <div className="flex-box">
          <Link to="/loyalty">Customer Loyalty</Link>
        </div>
        <div className="flex-box">
          <Link to="/inventory">Inventory Management</Link>
        </div>
      </div>
    </div>
    </div>
  );
}
