import React from "react";
import { FiTruck, FiShoppingBag } from "react-icons/fi";
import { useCartContext } from "../context/CartContext";
import useTitle from "../components/useTitle";
import CartCard from "../components/layouts/cart/CartCard";
import CartSummary from "../components/layouts/cart/CartSummary";

const Cart = () => {
  const { cartData, isLoading } = useCartContext();

  useTitle("Your Cart");

  const subtotal = cartData?.summary?.subtotal || 0;
  const freeShippingThreshold = 1000;
  const shipping = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const isEmpty = !cartData || cartData.items.length === 0;

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-stone-200 border-t-emerald-800 rounded-full animate-spin mx-auto" />
            <FiShoppingBag
              className="absolute inset-0 m-auto text-emerald-800 animate-pulse"
              size={20}
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 animate-pulse">
            Accessing Acquisition Manifest...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white pb-24">
      {/* 1600px Synchronized Container */}
      <div className="max-w-400 mx-auto px-6 pt-32 lg:pt-36">
        {/* --- HEADER --- */}
        <header className="mb-6 space-y-6 border-b border-stone-200 pb-6">
          <h1 className="text-25xl md:text-4xl font-serif tracking-tighter leading-none">
            My <span className="italic text-stone-300 font-light">Cart.</span>
          </h1>
        </header>

        {isEmpty ? (
          /* --- EMPTY STATE --- */
          <section className="py-40 flex flex-col items-center justify-center text-center space-y-6 p-16">
            <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center text-stone-200 shadow-sm border border-stone-100">
              <FiShoppingBag size={32} className="text-[#3E2723]" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-serif tracking-tight">
                Your cart is currently empty
              </h2>
              <p className="text-stone-400 font-sans text-[10px] max-w-sm mx-auto leading-relaxed uppercase tracking-widest font-bold">
                No volumes have been curated for acquisition yet.
              </p>
            </div>
          </section>
        ) : (
          /* --- CART CONTENT --- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* --- LEFT: ITEMS LIST (Span 8) --- */}
            <div className="lg:col-span-8 space-y-12">
              {/* Logistics Progress Card */}
              <div className="bg-white p-10 rounded-[3rem] border border-stone-200/60 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-950">
                    <FiTruck size={18} /> Registry Logistics
                  </span>
                  <span className="text-[10px] font-bold text-stone-400 tracking-[0.2em] uppercase">
                    {subtotal >= 1000
                      ? "Complementary Delivery Unlocked"
                      : `₹${freeShippingThreshold - subtotal} until free delivery`}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-800 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(6,78,59,0.2)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 pl-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-stone-300">
                    Manifest Items
                  </p>
                  <span className="px-3 py-1 bg-stone-100 rounded-md text-[10px] font-bold text-stone-500">
                    {cartData?.items.length}
                  </span>
                </div>
                <div className="space-y-6">
                  {cartData?.items.map((item) => (
                    <CartCard key={item.book._id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT: SUMMARY (Span 4) --- */}
            <CartSummary subtotal={subtotal} shipping={shipping} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
