import React from "react";
import { FiCreditCard, FiLock, FiInfo } from "react-icons/fi";
import { useCartContext } from "../../../context/CartContext";
import { usePaymentContext } from "../../../context/PaymentContext";
import { useAddressContext } from "../../../context/AddressContext";

const CheckoutSummary = () => {
  const { cartData } = useCartContext();
  const { placeRazorpayOrder } = usePaymentContext();
  const { selectedAddress } = useAddressContext();

  const subtotal = cartData?.summary.subtotal || 0;
  const shipping = subtotal > 1000 ? 0 : 50;

  return (
    <aside className="lg:col-span-5">
      <div className="bg-white border border-stone-200 rounded-[3rem] p-10 md:p-12 lg:sticky lg:top-32 shadow-2xl shadow-stone-200/40 overflow-hidden">
        {/* Header Decor */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif italic text-emerald-950">
            Order Review
          </h2>
          <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 border border-stone-100">
            <FiInfo size={16} />
          </div>
        </div>

        {/* --- MINI ITEM LIST --- */}
        <div className="space-y-5 mb-10 max-h-70 overflow-y-auto pr-3 custom-scrollbar">
          {cartData?.items.map((item, i) => (
            <div key={i} className="flex items-center gap-5 group">
              <div className="w-16 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-500">
                <img
                  src={item.book.images.cover}
                  alt={item.book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grow min-w-0 space-y-1">
                <h4 className="text-sm font-serif text-stone-800 truncate leading-tight">
                  {item.book.title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-tighter bg-stone-100 px-2 py-0.5 rounded text-stone-500">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium italic">
                    Archive Vol. {i + 1}
                  </span>
                </div>
              </div>
              <span className="text-sm font-serif font-medium text-stone-900">
                ₹{item.book.pricing.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* --- PRICING BREAKDOWN --- */}
        <div className="space-y-4 pt-8 border-t border-stone-100 relative">
          {/* Subtle Grain Overlay */}
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
            <span>Archive Subtotal</span>
            <span className="text-stone-900">₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
            <span>Logistics & Handling</span>
            <span
              className={
                shipping === 0 ? "text-emerald-700 font-bold" : "text-stone-900"
              }
            >
              {shipping === 0 ? "COMPLIMENTARY" : `₹${shipping}`}
            </span>
          </div>

          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
            <span>Registry Fee</span>
            <span className="text-emerald-700 font-bold tracking-widest italic">
              WAIVED
            </span>
          </div>

          {/* TOTAL SECTION */}
          <div className="mt-8 p-6 bg-[#fcfbf9] rounded-4xl border border-stone-100">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900">
                  Total Valuation
                </span>
                <p className="text-[9px] text-stone-400 uppercase tracking-widest">
                  Inc. all product taxes
                </p>
              </div>
              <span className="text-5xl font-serif tracking-tighter text-emerald-950">
                ₹{subtotal + shipping}
              </span>
            </div>
          </div>
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="mt-10 space-y-6">
          <button
            onClick={(e) => placeRazorpayOrder(e, selectedAddress)}
            className="group relative w-full py-6 bg-[#1C1B1F] text-white rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-900 transition-all duration-500 overflow-hidden shadow-xl shadow-stone-900/20"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              Proceed to Payment{" "}
              <FiCreditCard className="group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold">
            <FiLock className="text-emerald-700" /> 256-Bit SSL Encrypted
            Protocol
          </div>
        </div>

        {/* Footer Terms */}
        <p className="mt-8 text-[9px] text-center text-stone-400 uppercase tracking-[0.15em] leading-relaxed">
          By confirming, you authorize the <br />
          <span className="text-stone-900 underline underline-offset-4 cursor-pointer hover:text-emerald-800 transition-colors">
            acquisition agreement & returns policy
          </span>
        </p>
      </div>
    </aside>
  );
};

export default CheckoutSummary;
