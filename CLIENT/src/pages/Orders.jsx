/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FiArrowRight, FiSearch, FiBox } from "react-icons/fi";
import { useOrderContext } from "../context/OrderContext";
import useTitle from "../components/useTitle";
import { useAuthContext } from "../context/AuthContext";
import OrderItemCard from "../components/layouts/orders/OrderItemCard";

const Orders = () => {
  useTitle("Your Orders");
  const { userData } = useAuthContext();
  const { ordersData, getOrdersData, isLoading } = useOrderContext();

  useEffect(() => {
    getOrdersData();
  }, [userData]);

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-stone-200 border-t-emerald-800 rounded-full animate-spin mx-auto" />
            <FiBox
              className="absolute inset-0 m-auto text-emerald-800 animate-pulse"
              size={20}
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 animate-pulse">
            Retrieving Archival Ledger...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white pb-24">
      {/* Subtle Grain Overlay for texture */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.02),transparent)] pointer-events-none" />

      {/* Synchronized to 1600px */}
      <div className="max-w-400 mx-auto px-6 pt-32 lg:pt-36 relative z-10">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8 border-b border-stone-200 pb-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm">
                <FiBox className="text-emerald-800" size={20} />
              </div>
              <h1 className="text-2xl md:text-4xl font-serif tracking-tighter leading-none text-[#1A1A1A]">
                Your{" "}
                <span className="italic font-light text-stone-300">
                  Orders.
                </span>
              </h1>
            </div>
          </div>
        </header>

        {/* --- ORDERS LIST --- */}
        <section className="space-y-12 w-full">
          {ordersData && ordersData.length > 0 ? (
            ordersData.map((order) => (
              <OrderItemCard key={order._id} order={order} />
            ))
          ) : (
            <div className="py-20 border-2 border-dashed border-stone-200 rounded-[3rem] text-center space-y-4">
              <p className="font-serif text-2xl italic text-stone-400">
                The archive is currently empty.
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">
                No transactions recorded in your ledger yet.
              </p>
            </div>
          )}
        </section>

        {/* --- FOOTER CTA --- */}
        <footer className="mt-48 text-center border-t border-stone-200 pt-24">
          <div className="space-y-2 mb-10">
            <p className="text-stone-400 font-serif italic text-3xl">
              Seeking your next masterpiece?
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300">
              Curated volumes are waiting for your discovery
            </p>
          </div>
          <button className="inline-flex items-center gap-6 text-[12px] font-black uppercase tracking-[0.5em] text-emerald-900 border-b-2 border-emerald-900 pb-3 hover:text-black hover:border-black transition-all group">
            Browse New Volumes
            <FiArrowRight className="group-hover:translate-x-3 transition-transform" />
          </button>
        </footer>
      </div>
    </main>
  );
};

export default Orders;
