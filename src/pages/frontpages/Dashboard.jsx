import ProductCard from "../../components/ProductCard";
import { products } from "../../utils/data";

export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen relative 
      bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 
      text-gray-900 overflow-hidden">

      {/* 🌫️ Cahaya silver lembut kiri atas */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px]
        bg-gradient-to-br from-white/40 via-gray-200/30 to-gray-300/20
        blur-[140px] rounded-full animate-pulse -z-10"></div>

      {/* 🌫️ Cahaya silver lembut kanan bawah */}
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px]
        bg-gradient-to-tl from-gray-200/30 via-gray-300/20 to-gray-100/10
        blur-[120px] rounded-full -z-10"></div>

      {/* 🖤 Judul Hitam */}
      <h1
        className="text-center text-5xl sm:text-6xl font-extrabold mb-12 tracking-widest
        text-black
        drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]
        transition-all duration-500"
      >
        DASHBOARD
      </h1>

      {/* Grid Produk Responsive */}
      <div className="grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      ">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white/50 backdrop-blur-md border-2 border-gray-400 rounded-xl 
                       shadow-lg hover:shadow-2xl transition-all duration-300 p-4"
          >
            <ProductCard p={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
