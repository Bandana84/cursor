import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, user } = useAppContext();

  const fetchMyorders = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/carts/my-orders/', {
        headers: {
          Authorization: `Bearer ${user.tokens.access}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMyOrders(data);
      } else {
        setMyOrders([]);
      }
    } catch (err) {
      setMyOrders([]);
    }
  };

  useEffect(() => {
    fetchMyorders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <p className="text-2xl font-bold text-gray-800 mb-4">My Orders</p>
        <div className="space-y-8">
          {myOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
            >
              <p className="mb-4 text-sm text-gray-600">
                <span className="block">Order ID: <span className="font-medium">{order.id}</span></span>
                <span className="block">Payment: <span className="font-medium">{order.payment_method}</span></span>
                <span className="block">Total Amount: <span className="font-medium">{currency}{order.total_amount}</span></span>
              </p>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
