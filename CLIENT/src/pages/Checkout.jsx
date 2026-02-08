import React from "react";
import {
  FiLock,
  FiChevronLeft,
  FiTruck,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useTitle from "../components/useTitle";
import CheckoutSummary from "../components/layouts/checkout/CheckoutSummary";
import Address from "../components/layouts/checkout/Address";
import { useAddressContext } from "../context/AddressContext";

const Checkout = () => {
  useTitle("Checkout");
  const navigate = useNavigate();
  const { isLoading } = useAddressContext();

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-stone-200 border-t-emerald-800 rounded-full animate-spin mx-auto" />
            <FiLock
              className="absolute inset-0 m-auto text-emerald-800 animate-pulse"
              size={18}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white pb-24">
      {/* 1600px Synchronized Container */}
      <div className="max-w-400 mx-auto px-6 pt-32 lg:pt-36">
        {/* --- TOP BAR: NAVIGATION & SECURITY --- */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-emerald-900 transition-all"
          >
            <FiChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* --- LEFT: FORM SECTION (Span 7) --- */}
          <div className="lg:col-span-7 space-y-12">
            <header className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-serif tracking-tighter leading-tight text-[#3e2723]">
                Checkout{" "}
                <span className="italic text-stone-300 font-light">
                  Ledger.
                </span>
              </h1>
              <p className="text-stone-500 font-serif italic text-md">
                Enter your archival destination and logistics preferences.
              </p>
            </header>

            {/* Delivery Form Container */}
            <div className="bg-white/50 p-10 md:p-14 rounded-[3.5rem] border border-white shadow-sm backdrop-blur-sm">
              <Address />
            </div>

            {/* Shipping Method */}
            <section className="space-y-10 pl-4">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-800 border border-stone-100">
                  <FiTruck size={22} />
                </div>
                <div className="space-y-1">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-stone-500">
                    Logistics Preference
                  </h2>
                  <p className="text-[9px] text-stone-400 uppercase font-bold tracking-widest">
                    Selected Courier: Registry Express
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Standard Archive */}
                <label className="group relative flex items-center justify-between p-10 bg-white border-2 border-emerald-800 rounded-[3rem] cursor-pointer shadow-2xl shadow-emerald-900/5 transition-all hover:scale-[1.01]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-serif tracking-tight">
                        Standard Archive
                      </p>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[8px] font-black uppercase tracking-tighter rounded border border-emerald-100">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
                      Delivery Window: 3-5 Business Days
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-2xl font-serif italic text-emerald-900">
                      Complementary
                    </span>
                    <div className="w-6 h-6 bg-emerald-800 rounded-full flex items-center justify-center text-white">
                      <FiCheckCircle size={16} />
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* --- RIGHT: ORDER SUMMARY (Span 5) --- */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32">
              <CheckoutSummary />

              {/* Footer text inside the sidebar area */}
              <div className="mt-8 px-8 py-6 bg-stone-100/50 rounded-3xl border border-stone-200/50">
                <p className="text-[10px] text-stone-400 leading-relaxed font-medium uppercase tracking-wider text-center">
                  By confirming this order, you agree to our{" "}
                  <span className="text-stone-800 underline">
                    Archival Terms of Service
                  </span>{" "}
                  and acquisition protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
