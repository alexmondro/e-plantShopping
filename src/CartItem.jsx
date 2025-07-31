import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0; // Initialize total sum

    cart.forEach(item => {
        // Extract quantity and cost
        const quantity = item.quantity || 1; // Default to 1 if quantity is missing
        // Remove the "$" and convert cost to a number
        const cost = parseFloat(item.cost.substring(1));
        // Add to total: cost * quantity
        total += cost * quantity;
    });

    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    // Increase quantity by 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        // Decrease quantity by 1
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
        // If quantity would drop to 0, remove the item from the cart
        dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    // Dispatch the removeItem action with the item's name (or id, if that's what your reducer expects)
    dispatch(removeItem({ name: item.name }));
};

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Extract numeric value from cost string (e.g., "$10.00" -> 10.00)
    const unitPrice = parseFloat(item.cost.substring(1));
    // Multiply by quantity
    return unitPrice * item.quantity;
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


