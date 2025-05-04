import React from "react";
import { useAppContext } from "../../context/AppContext";
import { NavLink, Outlet, Link } from "react-router-dom";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: "/add_icon.svg" },
    { name: "Product List", path: "/seller/product-list", icon: "/product_list_icon.svg" },
    { name: "Orders", path: "/seller/orders", icon: "/order_icon.svg" },
  ];

  const logout = async () => {
    setIsSeller(false);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-green-600 text-white shadow-md">
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-10" />
        </Link>
        <div className="flex items-center gap-4">
          <p className="text-sm md:text-base font-medium">Hi! Admin</p>
          <button
            onClick={logout}
            className="bg-white text-green-700 border border-white px-4 py-1 rounded-full text-sm hover:bg-green-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="md:w-64 w-20 bg-white border-r border-gray-200 py-6 px-2 shadow-sm">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 mb-2 rounded-lg transition-all
                 ${isActive
                    ? "bg-green-100 text-green-700 font-semibold border-l-4 border-green-600"
                    : "hover:bg-gray-100 text-gray-700"
                 }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <span className="hidden md:inline text-sm">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Main Outlet */}
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
