import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { categories } from "../assets/assets";

const AllProducts = () => {
    const { products } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

    // Sort products based on selected option
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    return (
        <div className="mt-16 px-4 md:px-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.path} value={category.path}>
                                {category.text}
                            </option>
                        ))}
                    </select>

                    {/* Sort Options */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="default">Sort By</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                    </select>
                </div>
            </div>

            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-gray-500 text-lg">No products found</p>
                </div>
            )}
        </div>
    );
};

export default AllProducts; 