import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, user } = useAppContext();
  const navigate = useNavigate();

  // Address state
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: ''
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Handle address input
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Simulate order placement
  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || !address.state || !address.country) {
      toast.error('Please fill in all address fields.');
      return;
    }
    setIsPlacingOrder(true);

    // Simulate online payment
    if (paymentMethod === 'Online') {
      // Here you would integrate with a real payment gateway
      setTimeout(() => {
        toast.success('Payment successful! Order placed.');
        setIsPlacingOrder(false);
        navigate('/my-orders');
      }, 2000);
    } else {
      // Simulate COD order placement
      setTimeout(() => {
        toast.success('Order placed with Cash on Delivery!');
        setIsPlacingOrder(false);
        navigate('/my-orders');
      }, 1000);
    }
  };

  return (
    <div className="checkout-container" style={{maxWidth: 800, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8}}>
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Address Form */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <input className="input" name="street" placeholder="Street" value={address.street} onChange={handleAddressChange} style={{marginBottom: 8, width: '100%'}} />
          <input className="input" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} style={{marginBottom: 8, width: '100%'}} />
          <input className="input" name="state" placeholder="State" value={address.state} onChange={handleAddressChange} style={{marginBottom: 8, width: '100%'}} />
          <input className="input" name="country" placeholder="Country" value={address.country} onChange={handleAddressChange} style={{marginBottom: 8, width: '100%'}} />
        </div>
        {/* Order Summary */}
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
      {/* Payment Method */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <label className="mr-6">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === 'COD'}
            onChange={() => setPaymentMethod('COD')}
          /> Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="Online"
            checked={paymentMethod === 'Online'}
            onChange={() => setPaymentMethod('Online')}
          /> Online Payment
        </label>
      </div>
      <button
        className="checkout-btn mt-8"
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
        style={{padding: '12px 32px', background: '#4f46e5', color: '#fff', borderRadius: 6, fontWeight: 600, marginTop: 24}}
      >
        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout; 