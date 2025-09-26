// src/pages/frontpages/Cart.jsx
import { useCart } from "../../utils/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center 
                      bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 relative">
        {/* Lapisan glossy */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>

        <div className="relative text-center p-6 rounded-2xl 
                        bg-white/30 backdrop-blur-md shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-800">🛒 Your Cart is Empty</h2>
          <p className="mt-2 text-gray-600">Let's add some items to your cart!</p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-xl shadow hover:bg-pink-600 transition"
          >
            Go Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Hitung total harga
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="relative min-h-screen p-6 
                    bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
      {/* Lapisan glossy / kaca buram */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Judul */}
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
          <span className="text-black text-5xl">CART</span>
        </h1>

        {/* List Items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between 
                         bg-white/60 backdrop-blur-md rounded-2xl p-5 
                         shadow-xl border border-white/30 
                         hover:shadow-pink-100 transition"
            >
              {/* Gambar & Info */}
              <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl border-2 border-pink-100"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-pink-500 font-bold text-lg">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Quantity & Delete */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={item.qty}
                  min="1"
                  className="w-20 border-2 border-gray-300 rounded-lg text-center text-lg
                             focus:outline-none focus:ring-2 focus:ring-pink-300"
                  onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Bar */}
        <div className="sticky bottom-4 mt-10 bg-white/60 backdrop-blur-md 
                        rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row 
                        items-center justify-between border border-white/30">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <p className="text-gray-700 text-lg">Total Price</p>
            <p className="text-3xl font-extrabold text-pink-400">
              Rp {totalPrice.toLocaleString()}
            </p>
          </div>
          <Link
            to="/checkout"
            className="w-full sm:w-auto px-10 py-4 bg-pink-500 text-white text-xl font-bold
                       rounded-xl shadow hover:bg-pink-600 hover:shadow-pink-200
                       transition-transform transform hover:-translate-y-0.5 text-center"
          >
            Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
}
