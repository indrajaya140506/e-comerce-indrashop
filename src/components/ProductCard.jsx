// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div
      key={p.id}
      className="border rounded-lg p-4 shadow hover:shadow-lg flex flex-col"
    >
      {/* ✅ Gambar tetap full, responsive */}
      <img
        src={p.img}
        alt={p.name}
        className="w-full h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 object-cover rounded-md mb-4"
      />

      {/* ✅ Teks & tombol di-center */}
      <div className="text-center flex flex-col items-center justify-between flex-1">
        <h2 className="font-semibold text-base sm:text-lg md:text-xl mb-1">{p.name}</h2>
        <p className="text-gray-600 text-sm sm:text-md md:text-md mb-3">
          Rp {p.price.toLocaleString("id-ID")}
        </p>

        <Link
          to={`/product/${p.slug}`}
          className="text-blue-600 hover:underline block mb-4 text-sm sm:text-base"
        >
          Lihat Detail
        </Link>

        <button
          onClick={() => addToCart(p)}
          className="px-5 py-2 sm:px-6 sm:py-2.5 bg-blue-500 text-white rounded-lg 
          hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
