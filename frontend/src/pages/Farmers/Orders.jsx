import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { dummyOrders } from "../../assets/assets";
const Orders = () => {
    const { currency } = useAppContext()
    const [orders, setOrders] = useState([])
    
    const fetchOrders = async() => {
        setOrders(dummyOrders)
    }
    
    useEffect(() => {
        fetchOrders()
    }, [])
    
    return ( 
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800">Orders List</h2>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {/* Products */}
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg">
                                            <img className="w-12 h-12 object-contain opacity-70" src="/box_icon.svg" alt="Order" />
                                        </div>
                                        <div className="space-y-2">
                                            {order.items.map((item, index) => (
                                                <div key={index}>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.product.name}{" "}
                                                        {item.quantity > 1 && (
                                                            <span className="ml-1 text-indigo-600">x {item.quantity}</span>
                                                        )}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Address */}
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p className="font-medium text-gray-900">
                                            {order.address.firstName} {order.address.lastName}
                                        </p>
                                        <p>{order.address.street},</p>
                                        <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                                        <p>{order.address.country}</p>
                                        <p className="mt-2 text-gray-900">{order.address.phone}</p>
                                    </div>
                                    
                                    {/* Amount */}
                                    <div className="flex items-center">
                                        <p className="text-lg font-medium text-gray-900">
                                            {currency}{order.amount.toFixed(2)}
                                        </p>
                                    </div>
                                    
                                    {/* Payment Info */}
                                    <div className="text-sm space-y-1">
                                        <p>
                                            <span className="font-medium">Method:</span> {order.paymentType}
                                        </p>
                                        <p>
                                            <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders