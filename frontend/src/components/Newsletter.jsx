import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-green-50 to-green-100 text-green-900 shadow-lg rounded-3xl p-8 max-w-md mx-auto my-16 border border-green-200">
      {/* Icon with better styling */}
      <div className="bg-white p-4 rounded-full shadow-md border border-green-100">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-8 h-8 text-green-500"
          fill="currentColor"
        >
          <path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm0 2-7 5-7-5h14z" />
        </svg>
      </div>
      
      {/* Header with better typography */}
      <h2 className="text-2xl font-bold mt-6 text-center text-green-800">
        Stay Updated with <span className="text-green-600">Farm2Basket</span>!
      </h2>
      
      {/* Description text */}
      <p className="text-sm mt-3 text-center text-green-700 leading-relaxed max-w-xs">
        Join our newsletter for fresh farm deals, seasonal picks, and sustainable living tips.
      </p>

      {/* Form with improved styling */}
      <form className="w-full mt-6 space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-green-900 placeholder-green-400 transition-all duration-200 shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Subscribe Now
        </button>
      </form>
      
      {/* Footer links */}
      <div className="mt-8 pt-4 border-t border-green-200 w-full text-center">
        <p className="text-xs text-green-600">
          By subscribing, you agree to our <a href="#" className="font-medium hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Newsletter;