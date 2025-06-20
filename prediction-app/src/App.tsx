import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'antd/dist/reset.css';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<div>Profile Page (Placeholder)</div>} />
        <Route path="/dashboard" element={<div>Dashboard Page (Placeholder)</div>} />
        <Route path="/admin" element={<div>Admin Dashboard (Placeholder)</div>} />
        <Route path="/market/:id" element={<div>Market Details (Placeholder)</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;