import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
export default function App() {
return (
<Routes>
{/* memanggil Main Layout sebagai Layout pada seluruh halaman didalamnya,
pendekatan jika menggunakan Outlet pada JSX */}
<Route path="/" element={<MainLayout />}>
{/* mapping path ke component page, gunakan autocompletion */}
<Route index element={<Dashboard />} />
<Route path="product/:id" element={<ProductDetail />} />
<Route path="cart" element={<Cart />} />
<Route path="checkout" element={<Checkout />} />
</Route>
</Routes>
);
}