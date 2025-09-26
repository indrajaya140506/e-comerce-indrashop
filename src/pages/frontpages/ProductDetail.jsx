import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { products } from "../../utils/data";

export default function ProductDetail() {
  const { id } = useParams(); 
  const location = useLocation();
  const p = location.state;
  const product = p || products.find((item) => item.slug === id);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500 text-xl font-semibold">
        Produk tidak ditemukan.
      </div>
    );
  }

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    const newReview = { id: Date.now(), rating, review };
    setReviews([...reviews, newReview]);
    setRating(0);
    setReview("");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 space-y-8">
      <div className="md:flex md:gap-8">
        {/* Produk Card */}
        <section className="flex-1 bg-white/50 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-2xl mb-6 shadow-inner"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl sm:text-3xl text-pink-500 font-semibold mb-3">
            Rp {product.price.toLocaleString()}
          </p>
          <p className="text-yellow-400 text-lg mb-4">
            {"★".repeat(product.rating)}
            <span className="text-gray-300">{"★".repeat(5 - product.rating)}</span>
          </p>
          <p className="text-gray-700 leading-relaxed">
           
          </p>
        </section>

        {/* Reviews Card */}
        <section className="flex-1 mt-6 md:mt-0 bg-white/50 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500 mb-4">Belum ada review.</p>
          ) : (
            <ul className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="border rounded-2xl p-4 bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-lg">
                      {"★".repeat(r.rating)}
                    </span>
                    <span className="text-gray-300 text-lg ml-1">
                      {"★".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="text-gray-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Form Review */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Rating:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-transform duration-200 ${
                      star <= rating ? "text-yellow-400 scale-125" : "text-gray-300 hover:scale-110"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Review:</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition-all duration-300 resize-none"
                rows="4"
                placeholder="Tulis pengalaman Anda..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Submit Review
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
