// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { dispatch, cart } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  return (
    <div className="grid grid-cols-1 lg:px-16 sm:grid-cols-2 text-center font-poppins   lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105 animate-fadeInUp">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md mb-3" />
          <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{product.description.slice(0, 100)}...</p>
          <p className="text-blue-500 font-bold text-lg mb-4">${product.price}</p>

          <button
            onClick={() => isInCart(product.id) ? dispatch({ type: 'REMOVE_FROM_CART', payload: product.id }) : addToCart(product)}
            className={`w-full py-2 rounded font-semibold transition-transform transform hover:animate-bounceIn ${isInCart(product.id) ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
