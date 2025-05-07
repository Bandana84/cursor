import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './MainBanner.css'; // We'll create this CSS file for additional styles

const MainBanner = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products/banners/');
                if (!response.ok) {
                    throw new Error('Failed to fetch banners');
                }
                const data = await response.json();
                // Ensure we're setting an array
                const bannerData = Array.isArray(data) ? data : (data.results || []);
                setBanners(bannerData);
            } catch (error) {
                console.error('Failed to fetch banners:', error);
                // Fallback to default banners if API fails
                setBanners([
                    { id: 1, image: '/banner.webp', title: 'Default Banner 1', subtitle: 'Fresh produce directly from local farmers' },
                    { id: 2, image: '/banner2.jpg', title: 'Default Banner 2', subtitle: 'Your one stop solution for farm-to-market shopping' },
                    { id: 3, image: '/banner3.jpg', title: 'Default Banner 3', subtitle: 'Quality products at affordable prices' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/placeholder.png';
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:8000${imagePath.startsWith('/') ? '' : '/media/'}${imagePath}`;
    };

    if (loading) {
        return (
            <div className="w-full h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden banner-container">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ 
                    delay: 3000, 
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true 
                }}
                loop={true}
                pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet custom-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                speed={800}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                className="w-full h-[400px] md:h-[600px] lg:h-[700px] swiper-overlay"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative w-full h-full">
                            <img 
                                src={getImageUrl(banner.image)} 
                                alt={banner.title} 
                                className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Arrows */}
                <div className="swiper-button-next-custom hidden md:flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="swiper-button-prev-custom hidden md:flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                    </svg>
                </div>
            </Swiper>

            {/* Content over the banner */}
            <div className="absolute inset-0 z-10 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24 banner-content">
                {/* Animated Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-left max-w-[300px] md:max-w-[400px] lg:max-w-[550px] xl:max-w-[650px] leading-tight lg:leading-[1.3] text-white drop-shadow-lg animate-fadeInUp">
                    Your one stop solution for farm-to-market shopping
                </h1>

                {/* Subheading with delay animation */}
                <p className="mt-4 text-lg md:text-xl text-white/90 text-center md:text-left max-w-[300px] md:max-w-[400px] lg:max-w-[500px] drop-shadow-md animate-fadeInUp delay-100">
                    Fresh produce directly from local farmers to your doorstep
                </p>

                {/* Buttons with hover effects */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 font-medium animate-fadeInUp delay-200">
                    {/* Shop Now button */}
                    <Link 
                        to="/products" 
                        className="group relative flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition-all rounded-lg text-white cursor-pointer overflow-hidden button-hover-effect"
                    >
                        <span className="relative z-10">Shop now</span>
                        <svg 
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                        <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></span>
                    </Link>

                    {/* Explore Deals button */}
                    <Link 
                        to="/products" 
                        className="group relative flex items-center gap-2 px-7 md:px-9 py-3 bg-white text-primary font-semibold rounded-lg shadow hover:shadow-lg transition-all cursor-pointer button-hover-effect"
                    >
                        <span className="relative z-10">Explore deals</span>
                        <svg 
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                        <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;

