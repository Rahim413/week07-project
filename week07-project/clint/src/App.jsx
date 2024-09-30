
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import DashBoard from './components/DashBoard'; 
import StoreItems from './components/StoreItems';
import SearchItems from './components/SearchItems';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/items" element={<StoreItems />} />
        <Route path="/search" element={<SearchItems />} />
      </Routes>
    </Router>
  );
}
