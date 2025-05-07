import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import api from '../utils/axios';
import toast from 'react-hot-toast';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency, fetchCart } = useAppContext();
  const { address, paymentMethod, totalAmount } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/checkout');
      return;
    }

    // Initialize Khalti payment
    const script = document.createElement('script');
    script.src = 'https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const config = {
        publicKey: 'YOUR_KHALTI_PUBLIC_KEY', // Replace with your Khalti public key
        productIdentity: 'Order Payment',
        productName: 'E-commerce Order',
        productUrl: window.location.href,
        eventHandler: {
          onSuccess(payload) {
            handlePaymentSuccess(payload);
          },
          onError(error) {
            toast.error('Payment failed. Please try again.');
            console.error('Payment error:', error);
          },
          onClose() {
            console.log('Payment window closed');
          }
        },
        paymentPreference: ['KHALTI'],
        theme: {
          color: '#4f46e5'
        }
      };

      const checkout = new window.KhaltiCheckout(config);
      checkout.show({ amount: totalAmount * 100 }); // Amount in paisa
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [location.state, navigate, totalAmount]);

  const handlePaymentSuccess = async (payload) => {
    try {
      const response = await api.post('/carts/order/', {
        ...address,
        payment_method: paymentMethod,
        payment_details: {
          provider: 'khalti',
          transaction_id: payload.idx,
          amount: payload.amount / 100,
          status: 'completed'
        }
      });

      if (response.status === 201) {
        toast.success('Payment successful! Order placed.');
        fetchCart();
        navigate('/my-orders');
      }
    } catch (err) {
      console.error('Order creation error:', err);
      toast.error('Payment successful but order creation failed. Please contact support.');
    }
  };

  if (!location.state) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Complete Your Payment</h2>
            <p className="mt-1 text-indigo-100">Secure payment through Khalti</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Order Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      {currency}{totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Address:</span> {address.street}, {address.city}, {address.province}, {address.country}</p>
                  <p><span className="font-medium">Phone:</span> {address.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Payment Instructions</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Please complete your payment using Khalti. The payment window will open automatically.</p>
                    <p className="mt-1">If the payment window doesn't open, please refresh the page.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/checkout')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Checkout
              </button>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 