// src/utils/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// 1. Buat Context
const CartContext = createContext();

// 2. Buat Provider
export function CartProvider({ children }) {
  // Ambil data dari localStorage saat aplikasi pertama kali dimuat
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart data from localStorage", error);
      return [];
    }
  });

  // Simpan data ke localStorage setiap kali state 'cart' berubah
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart data to localStorage", error);
    }
  }, [cart]);

  // Fungsi untuk menambah produk ke keranjang
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Fungsi untuk memperbarui jumlah produk
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Hitung total jumlah item di keranjang
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // 3. Sediakan nilai ke komponen anak
  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, totalQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 4. Custom hook
export const useCart = () => useContext(CartContext);