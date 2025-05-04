import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const Bestseller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-20 px-4 md:px-8">
      <p className="text-3xl md:text-4xl font-extrabold text-primary mb-8 text-center md:text-left animate-fadeIn">
        Best Sellers
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              className="hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
            />
          ))}
      </div>
    </div>
  );
};

export default Bestseller;
