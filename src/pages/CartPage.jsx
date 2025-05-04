import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedPrice = totalPrice * 0.9;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 animate-fadeIn">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 animate-fadeIn">Your cart is empty.</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white animate-fadeIn"
            >
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                <span className="mx-2 font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
              </div>
              <p className="font-semibold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4 animate-fadeIn">
            <h2 className="text-2xl font-bold">Total: <span className="text-blue-500">${discountedPrice.toFixed(2)}</span> (10% discount applied)</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
