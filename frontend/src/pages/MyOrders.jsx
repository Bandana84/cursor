import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyorders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyorders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <p className="text-2xl font-bold text-gray-800 mb-4">My Orders</p>
        <div className="space-y-8">
          {myOrders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
            >
              <p className="mb-4 text-sm text-gray-600">
                <span className="block">Order ID: <span className="font-medium">{order._id}</span></span>
                <span className="block">Payment: <span className="font-medium">{order._paymentType}</span></span>
                <span className="block">Total Amount: <span className="font-medium">{currency}{order.amount}</span></span>
              </p>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between border-t pt-4 mt-4 "
                >
                  <div className="flex gap-4 items-start md:items-center">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                      <p className="text-sm text-gray-500">Category: {item.product.category}</p>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 text-sm text-gray-700">
                    <p>Quantity: {item.quantity || '1'}</p>
                    <p>Status: {order.status}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="font-medium text-gray-800 mt-2">
                      Amount: {currency}{item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
