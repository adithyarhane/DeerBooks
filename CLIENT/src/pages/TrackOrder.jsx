/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  FiTruck,
  FiMapPin,
  FiArrowLeft,
  FiCalendar,
  FiInfo,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderContext } from "../context/OrderContext";
import useTitle from "../components/useTitle";
import { useAuthContext } from "../context/AuthContext";

const TrackOrder = () => {
  useTitle("Track Order");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  const { trackSteps, order, getOrderById, isLoading } = useOrderContext();
  const { orderId } = useParams();

  useEffect(() => {
    getOrderById(orderId);
  }, [orderId, isLoggedIn]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-stone-200 border-t-emerald-800 rounded-full animate-spin mx-auto" />
            <FiTruck
              className="absolute inset-0 m-auto text-emerald-800 animate-pulse"
              size={20}
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 animate-pulse">
            Consulting Archives...
          </p>
        </div>
      </main>
    );
  }

  if (!order) return null;

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white pb-24">
      <div className="max-w-400 mx-auto px-6 pt-28 lg:pt-32">
        {/* --- NAVIGATION --- */}
        <button
          onClick={() => {
            navigate(-1);
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-black transition-colors mb-12"
        >
          <FiArrowLeft size={16} /> Back to History
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* --- LEFT: TRACKING TIMELINE --- */}
          <div className="lg:col-span-7 space-y-12">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-800 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                  {order.status}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                  ID: {order.orderId}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif tracking-tighter text-[#1A1A1A]">
                Track <span className="italic text-stone-400">Journey.</span>
              </h1>
            </header>

            <div className="relative space-y-12 pl-8 max-w-2xl text-[#1A1A1A]">
              <div className="absolute left-2.75 top-2 bottom-2 w-0.5 bg-stone-200" />

              {trackSteps.map((step, idx) => (
                <div key={idx} className="relative group text-[#1A1A1A]">
                  <div
                    className={`absolute -left-8 top-1 w-6 h-6 rounded-full border-4 border-[#f5f1ea] z-10 transition-colors duration-500 ${
                      step.completed ? "bg-emerald-800" : "bg-stone-200"
                    } ${step.current ? "ring-4 ring-emerald-800/20 scale-125" : ""}`}
                  />

                  <div
                    className={`space-y-1 transition-opacity duration-500 ml-2 ${
                      step.completed ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl font-serif tracking-tight">
                        {step.status}
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 font-light leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                    {step.time && (
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest pt-1">
                        {step.time}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: LOGISTICS SUMMARY --- */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200 p-8 rounded-[2.5rem] shadow-xl shadow-stone-200/50 space-y-8">
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                  Order Logistics
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                    <FiTruck className="text-emerald-800" size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-serif">Registry Express</p>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Tracking: {order.orderId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 space-y-6">
                <div className="flex gap-4">
                  <FiMapPin className="text-stone-300 mt-1" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                      Order Destination
                    </p>
                    <p className="text-sm font-serif italic">
                      {order.shippingAddress.streetAddress},
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FiCalendar className="text-stone-300 mt-1" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                      Expected Delivery
                    </p>
                    <p className="text-sm font-serif italic">
                      {new Date(order.expectedDeliveryDate).toDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-[#1C1B1F] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-950 transition-all flex items-center justify-center gap-3">
                Support Protocol <FiInfo />
              </button>
            </div>

            <div className="p-8 bg-emerald-50 rounded-4xl border border-emerald-100">
              <p className="text-xs text-emerald-900 leading-relaxed font-serif italic">
                "Our curators are monitoring this shipment to ensure your
                volumes arrive in pristine condition."
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default TrackOrder;
