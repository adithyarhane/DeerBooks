import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInfo, FiShield } from "react-icons/fi";
import { useCartContext } from "../../../context/CartContext";

const CartSummary = ({ subtotal, shipping }) => {
  const { cartData } = useCartContext();
  return (
    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
      <div className="bg-[#1C1B1F] text-white p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden group">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-800/20 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-emerald-800/30 transition-colors duration-700" />

        <h2 className="text-4xl font-serif mb-12 italic tracking-tight">
          Summary
        </h2>

        <div className="space-y-6 border-b border-white/10 pb-12">
          <div className="flex justify-between text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500">
            <span>Subtotal</span>
            <span className="text-white">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500">
            <span>Registry Fees</span>
            <span className="text-white italic">Incl.</span>
          </div>
          <div className="flex justify-between text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500">
            <span>Logistics</span>
            <span
              className={`font-black ${shipping === 0 ? "text-emerald-400" : "text-white"}`}
            >
              {shipping === 0 ? "FREE" : `₹${shipping}`}
            </span>
          </div>
        </div>

        <div className="pt-12 space-y-12">
          <div className="flex flex-col gap-2 items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-600">
              Total Valuation
            </span>
            <span className="text-6xl font-serif tracking-tighter leading-none">
              ₹{(cartData?.summary.totalPayable + shipping).toLocaleString()}
            </span>
          </div>

          <Link
            to={"/checkout"}
            className="w-full py-7 bg-white text-[#1C1B1F] rounded-full text-[12px] font-black uppercase tracking-[0.4em] hover:bg-emerald-50 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95"
          >
            Confirm Order <FiArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Trust & Policy Tags */}
      <div className="px-8 space-y-6 pt-4">
        <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-stone-100 text-emerald-800">
            <FiShield size={16} />
          </div>
          Secure Encrypted Protocol
        </div>
        <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-stone-100 text-emerald-800">
            <FiInfo size={16} />
          </div>
          14-Day Archival Returns
        </div>
      </div>
    </aside>
  );
};

export default CartSummary;
