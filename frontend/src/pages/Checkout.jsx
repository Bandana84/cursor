import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, user, fetchCart } = useAppContext(); // assuming you have fetchCart
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: '',
    city: '',
    province: '',
    country: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || !address.province || !address.country || !address.phone) {
      toast.error('Please fill in all address fields.');
      return;
    }

    if (cart.items.length === 0) {
      toast.error('Cart is empty.');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const requestData = {
        ...address,
        payment_method: paymentMethod,
      };

      console.log('Sending order data:', requestData);

      const response = await fetch('http://localhost:8000/api/carts/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.tokens?.access}`,
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Order error:', data);
        throw new Error(data.error || data.detail || 'Failed to place order.');
      }

      console.log('Order response:', data);
      toast.success('Order placed successfully!');
      await fetchCart(); // refresh cart
      navigate('/my-orders');
    } catch (err) {
      console.error('Order error:', err);
      toast.error(err.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-container" style={{ maxWidth: 800, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          {[
            { name: 'street', label: 'Street Address' },
            { name: 'city', label: 'City' },
            { name: 'province', label: 'Province' },
            { name: 'country', label: 'Country' },
            { name: 'phone', label: 'Phone Number' }
          ].map((field) => (
            <input
              key={field.name}
              className="input"
              name={field.name}
              placeholder={field.label}
              value={address[field.name]}
              onChange={handleAddressChange}
              style={{ marginBottom: 8, width: '100%' }}
            />
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <ul className="mb-4">
            {cart.items.map(item => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.offer_price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{cart.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%):</span>
            <span>₹{cart.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>₹{cart.grand_total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        {['COD', 'Online'].map(method => (
          <label className="mr-6" key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            /> {method === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
          </label>
        ))}
      </div>

      <button
        className="checkout-btn mt-8"
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
        style={{ padding: '12px 32px', background: '#4f46e5', color: '#fff', borderRadius: 6, fontWeight: 600, marginTop: 24 }}
      >
        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;
