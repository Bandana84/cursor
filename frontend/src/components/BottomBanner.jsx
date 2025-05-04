import React from 'react';
import { features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img src="/bottom_banner_image.png" alt="banner" className="w-full hidden md:block object-cover rounded-2xl shadow-lg" />
      <img src="/bottom_banner_image_sm.png" alt="banner" className="w-full md:hidden object-cover rounded-2xl shadow-lg" />

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-20 md:pt-0 md:pr-24 px-6">
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl max-w-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 text-center md:text-right animate-fadeIn">
            Why We Are the Best?
          </h1>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-5 group hover:bg-primary/10 p-3 rounded-xl transition-all duration-300"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 md:w-12 group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
