import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CreateAccount from './pages/CreateAccount';
import SignIn from './pages/SignIn';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      }} />
      <Routes>
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<Navigate to="/marketplace" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
