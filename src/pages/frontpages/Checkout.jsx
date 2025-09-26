import React, { useState } from "react";
import { useCart } from "../../utils/CartContext";
import briLogo from "../../assets/bri.png";
import shopeepayLogo from "../../assets/shopeepay.png";
import qrisLogo from "../../assets/qris.png";
import { QRCodeCanvas } from "qrcode.react";

export default function Checkout() {
  const { cart } = useCart(); 
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [briAccount, setBriAccount] = useState("");
  const [shopeeAccount, setShopeeAccount] = useState("");
  const qrisData = "https://contoh-qris-demo.com/pay12345";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !payment) {
      alert("Harap lengkapi Nama, Alamat, dan Metode Pembayaran!");
      return;
    }
    let extraInfo = "";
    if (payment === "BRI") extraInfo = `\nNo Rekening: ${briAccount}`;
    if (payment === "ShopeePay") extraInfo = `\nNo HP: ${shopeeAccount}`;

    let cartDetails = cart
      .map(
        (item) =>
          `${item.name} - ${item.qty} x Rp ${item.price.toLocaleString()} = Rp ${(
            item.qty * item.price
          ).toLocaleString()}`
      )
      .join("\n");

    alert(
      `Pesanan atas nama ${name}\nAlamat: ${address}\nMetode: ${payment}${extraInfo}\n\nDetail Barang:\n${cartDetails}\n\nTotal: Rp ${total.toLocaleString()}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 p-6">
      {/* Ringkasan Pesanan */}
      <div className="w-full max-w-3xl bg-gray-800 text-white shadow-2xl rounded-2xl p-8 border border-gray-700 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 pointer-events-none"></div> {/* efek glossy */}
        <h2 className="text-3xl font-bold mb-4 text-center">Ringkasan Pesanan</h2>
        {cart.length === 0 ? (
          <p className="text-gray-300 text-center">Keranjang kosong.</p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-700/50 p-3 rounded-xl shadow-inner"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-300">
                    {item.qty} x Rp {item.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-bold">Rp {(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
            <div className="flex justify-between items-center border-t border-gray-600 pt-4 text-lg font-bold">
              <span>Total</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Form Checkout */}
      <div className="w-full max-w-xl bg-gray-800 text-white shadow-2xl rounded-2xl p-8 border border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 pointer-events-none"></div> {/* efek glossy */}
        <h1 className="text-5xl font-extrabold text-center mb-8">CHECKOUT</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Nama */}
          <div>
            <label className="block text-lg font-semibold mb-2">Nama Penerima</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-600"
            />
          </div>

          {/* Input Alamat */}
          <div>
            <label className="block text-lg font-semibold mb-2">Alamat Pengiriman</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan alamat lengkap"
              rows="3"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-600"
            />
          </div>

          {/* Metode Pembayaran */}
          <div>
            <p className="text-lg font-semibold mb-3">Pilih Metode Pembayaran</p>
            <div className="space-y-4">
              {/* BRI */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition
                ${payment === "BRI" ? "bg-pink-100 border-pink-400" : "bg-gray-700 border-gray-600 hover:border-pink-300"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="BRI"
                  checked={payment === "BRI"}
                  onChange={() => setPayment("BRI")}
                  className="w-5 h-5 text-pink-500 focus:ring-pink-400"
                />
                <img src={briLogo} alt="BRI" className="w-10 h-10 object-contain" />
                <span className="text-lg font-semibold">BRI Transfer</span>
              </label>

              {/* ShopeePay */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition
                ${payment === "ShopeePay" ? "bg-pink-100 border-pink-400" : "bg-gray-700 border-gray-600 hover:border-pink-300"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="ShopeePay"
                  checked={payment === "ShopeePay"}
                  onChange={() => setPayment("ShopeePay")}
                  className="w-5 h-5 text-pink-500 focus:ring-pink-400"
                />
                <img src={shopeepayLogo} alt="ShopeePay" className="w-10 h-10 object-contain" />
                <span className="text-lg font-semibold">ShopeePay</span>
              </label>

              {/* QRIS */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition
                ${payment === "QRIS" ? "bg-pink-100 border-pink-400" : "bg-gray-700 border-gray-600 hover:border-pink-300"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="QRIS"
                  checked={payment === "QRIS"}
                  onChange={() => setPayment("QRIS")}
                  className="w-5 h-5 text-pink-500 focus:ring-pink-400"
                />
                <img src={qrisLogo} alt="QRIS" className="w-10 h-10 object-contain" />
                <span className="text-lg font-semibold">QRIS</span>
              </label>
            </div>
          </div>

          {/* Field tambahan */}
          {payment === "BRI" && (
            <input
              type="text"
              placeholder="Masukkan No Rekening BRI"
              value={briAccount}
              onChange={(e) => setBriAccount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-600"
            />
          )}
          {payment === "ShopeePay" && (
            <input
              type="text"
              placeholder="Masukkan No HP ShopeePay"
              value={shopeeAccount}
              onChange={(e) => setShopeeAccount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-600"
            />
          )}
          {payment === "QRIS" && (
            <div className="flex justify-center bg-white p-4 rounded-xl">
              <QRCodeCanvas
                value={qrisData}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white text-lg
                       font-bold py-3 rounded-xl shadow-lg transition"
          >
            Konfirmasi Pesanan
          </button>
        </form>
      </div>
    </div>
  );
}
