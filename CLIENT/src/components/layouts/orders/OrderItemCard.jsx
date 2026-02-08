import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiClock, FiPackage } from "react-icons/fi";
import { formatDate } from "../../../utils/formatDate";

const OrderItemCard = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div key={order.orderId} className="group relative">
      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">
        <div className="flex items-center gap-10">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Entry ID
            </p>
            <p className="text-sm font-mono font-bold tracking-wider">
              {order.orderId}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Acquired On
            </p>
            <p className="text-sm font-serif italic text-stone-600">
              {formatDate(order.placedAt)}
            </p>
          </div>
          <div className="space-y-1 hidden sm:block">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Valuation
            </p>
            <p className="text-sm font-serif">₹{order.pricing.totalPayable}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border transition-all ${
              order.status === "Delivered"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
            }`}
          >
            {order.status === "Delivered" ? (
              <FiCheckCircle size={12} />
            ) : (
              <FiClock size={12} />
            )}
            {order.status}
          </span>
        </div>
      </div>

      {/* Main Content Card (Fanned Layout) */}
      <div className="bg-white/50 backdrop-blur-md border border-stone-200 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 group-hover:bg-white group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700">
        {/* Visual Stack of Books with fanning effect */}
        <div className="flex -space-x-12 md:-space-x-16 shrink-0 relative py-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="w-28 md:w-36 aspect-[3/4.5] rounded-lg overflow-hidden shadow-2xl ring-4 ring-white transition-all duration-500 group-hover:-rotate-3 group-hover:-translate-y-2.5 group-hover:even:rotate-3"
              style={{
                zIndex: 10 - idx,
                transform: `rotate(${idx * 2}deg)`,
              }}
            >
              <img
                onClick={() =>
                  navigate(`/book-details/${item.book.slug}/${item.book._id}`)
                }
                src={item.book.images.cover}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className="grow space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-stone-900 leading-tight">
              {order.items.length > 1
                ? `${order.items[0].title} & ${order.items.length - 1} other volumes`
                : order.items[0].title}
            </h3>
            <p className="text-xs text-stone-400 font-bold tracking-[0.2em] uppercase">
              Manifest contains{" "}
              {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => {
                navigate(`/track-order/${order._id}`);
                scrollTo(0, 0);
              }}
              className="group/btn flex items-center gap-3 px-8 py-4 rounded-full bg-[#1C1B1F] text-white text-[11px] font-black uppercase tracking-widest hover:bg-emerald-950 transition-all shadow-lg"
            >
              Track Shipment
              <FiPackage className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
