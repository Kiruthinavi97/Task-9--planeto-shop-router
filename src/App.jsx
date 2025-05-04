import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { CartProvider, useCart } from './context/CartContext';
import FloatingText from './pages/FloatingText';

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">🛒 PLANETO</Link>
      
      <Link to="/cart" className="relative bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
        View Cart
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Link>
      
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 text-black">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </div>
      <FloatingText />
    </CartProvider>
  );
}

export default App;
