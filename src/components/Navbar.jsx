// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../utils/CartContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { totalQty } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700
      backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-b border-gray-600/50">

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* =================== TOP BAR =================== */}
        <div className="flex items-center justify-between py-4">
          {/* Logo + Nama Toko */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-400 shadow-md">
              <img
                src={logo}
                alt="INDRAshop Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-3xl font-extrabold drop-shadow-sm flex items-center">
              <span className="tracking-wider text-gray-100">INDRA</span>
              <span className="ml-1 text-pink-500">shop</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-12">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-100 hover:text-pink-500 active:text-blue-500
              transition-all duration-300 hover:scale-105"
            >
              Dashboard
            </Link>

            {/* Cart + ikon */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-xl font-semibold text-gray-100 
              hover:text-pink-500 active:text-blue-500 transition-all duration-300 hover:scale-105"
            >
              {/* SVG keranjang */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-pink-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M17 13l1.5 7.5M6 21h12" />
              </svg>
              Cart
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs font-bold
                  rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {totalQty}
                </span>
              )}
            </Link>

            <Link
              to="/checkout"
              className="text-xl font-semibold text-gray-100 hover:text-pink-500 active:text-blue-500
              transition-all duration-300 hover:scale-105"
            >
              Checkout
            </Link>
          </div>

          {/* Search Box Desktop */}
          <div className="hidden md:block relative">
            <input
              type="text"
              list="product-options"
              placeholder="🔍 Cari produk..."
              className="w-52 px-6 py-2 border-2 border-gray-500/80 rounded-full bg-gray-700/80
                text-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400
                transition-all duration-300 shadow-inner hover:shadow-lg"
            />
            <datalist id="product-options">
              <option value="hat" />
              <option value="sneakers" />
              <option value="tshirt" />
              <option value="pants" />
            </datalist>
          </div>

          {/* Hamburger Button Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-md
            border-2 border-gray-500 hover:border-pink-400 transition-all duration-200"
          >
            <svg
              className="w-7 h-7 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-gray-100 hover:text-pink-500 px-2"
            >
              Dashboard
            </Link>

            {/* Cart Mobile */}
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="relative flex items-center gap-2 text-lg font-medium text-gray-100 hover:text-pink-500 px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-pink-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M17 13l1.5 7.5M6 21h12" />
              </svg>
              Cart
              {totalQty > 0 && (
                <span className="absolute ml-2 bg-pink-500 text-white text-xs font-bold
                  rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </Link>

            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-gray-100 hover:text-pink-500 px-2"
            >
              Checkout
            </Link>

            {/* Search Mobile */}
            <div className="relative mt-2">
              <input
                type="text"
                list="product-options"
                placeholder="🔍 Cari produk..."
                className="w-full px-6 py-2 border-2 border-gray-500/80 rounded-full bg-gray-700/80
                  text-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400
                  transition-all duration-300 shadow-inner hover:shadow-lg"
              />
              <datalist id="product-options">
                <option value="hat" />
                <option value="sneakers" />
                <option value="tshirt" />
                <option value="pants" />
              </datalist>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
