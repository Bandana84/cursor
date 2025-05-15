import React, { useState } from 'react'
import { categories } from "../../assets/assets";






const AddProduct = () => {
    const[files,setFiles]=useState([])
    const[name,setName]=useState([])
    const[description,setDescription]=useState([])
    const[category,setCategory]=useState([])
    const[price,setPrice]=useState([])
    const[OfferPrice,setOfferPrice]=useState([])
    
const onSubmit=async(event)=>{
    event.preventDefault();
}

  return (
    <div className=" no-scrollbar py-10 px-4 md:px-10 bg-white min-h-screen">
      <form  onSubmit={onSubmit}className="space-y-6 max-w-2xl mx-auto bg-white p-6 border border-gray-200 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>

        {/* Product Image Upload */}
        <div>
          <p className="text-base font-medium text-gray-700 mb-2">Product Images</p>
          <div className="flex flex-wrap gap-4">
            {Array(4)
              .fill('')
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer border border-dashed border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition"
                >
                  <input onChange={(e)=>{
                    const updatedFiles=[...files];
                    updatedFiles[index]= e.target.files[0] 
                    setFiles(updatedFiles)
                  }}
                   accept="image/*" type="file" id={`image${index}`} hidden />
                  <img
                    src={files[index]? URL.createObjectURL(files[index]):"/upload_area.png"}
                    alt="Upload Area"
                    className="w-24 h-24 object-contain"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="product-name" className="text-base font-medium text-gray-700">
            Product Name
          </label>
          <input onChange={(e)=>setName(e.target.value)}
            id="product-name"
            type="text"
            value={name}
            placeholder="Type here"
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="product-description" className="text-base font-medium text-gray-700">
            Product Description
          </label>
          <textarea onChange={(e)=>setDescription(e.target.value)} 
          value={description}
            id="product-description"
            rows={4}
            placeholder="Type here"
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-base font-medium text-gray-700">
            Category
          </label>
          <select onChange={(e)=>setCategory(e.target.value)} 
          value={category}
            id="category"
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Category</option>
            {categories.map((item,index)=>(
              <option key={index} value={item.path}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        {/* Price Fields */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label htmlFor="product-price" className="text-base font-medium text-gray-700">
              Product Price
            </label>
            <input onChange={(e)=>setPrice(e.target.value)}
            value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label htmlFor="offer-price" className="text-base font-medium text-gray-700">
              Offer Price
            </label>
            <input onChange={(e)=>setOfferPrice(e.target.value)}
            value={OfferPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
