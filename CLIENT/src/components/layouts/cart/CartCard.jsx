import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCartContext } from "../../../context/CartContext";

const CartCard = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartContext();
  return (
    <div
      key={item._id}
      className="flex flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white border border-stone-100 rounded-3xl sm:rounded-4xl transition-all hover:shadow-xl hover:shadow-stone-200/50"
    >
      {/* Cover Art - Slightly smaller on mobile to save horizontal space */}
      <div className="w-16 h-20 sm:w-24 sm:h-32 shrink-0 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
        <img
          src={item.book.images.cover}
          alt={item.book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section - Now aligns left on all devices */}
      <div className="grow min-w-0 space-y-0.5 sm:space-y-1 text-left">
        <h3 className="text-sm sm:text-xl font-serif text-[#1C1B1F] leading-tight truncate">
          {item.book.title}
        </h3>
        <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-stone-400 truncate">
          {item.book.authors[0].name}{" "}
          <span className="hidden xs:inline">— {item.type}</span>
        </p>
        <p className="text-sm sm:text-lg font-serif mt-1">
          ₹{item.book.pricing.price}
        </p>
      </div>

      {/* Controls - Aligned in a row to save vertical space */}
      <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-6">
        {/* Quantity Selector */}
        <div className="flex items-center border border-stone-200 rounded-full px-2 py-1 sm:px-4 sm:py-2 gap-2 sm:gap-4">
          <button
            onClick={(e) => updateQuantity(e, item.book._id, item.quantity - 1)}
            className="text-stone-400 hover:text-black transition-colors"
          >
            <FiMinus size={12} className="sm:w-3.5" />
          </button>
          <span className="text-[10px] sm:text-xs font-bold w-3 sm:w-4 text-center">
            {item.quantity}
          </span>
          <button
            onClick={(e) => updateQuantity(e, item.book._id, item.quantity + 1)}
            className="text-stone-400 hover:text-black transition-colors"
          >
            <FiPlus size={12} className="sm:w-3.5" />
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={(e) => removeFromCart(e, item.book._id)}
          className="text-stone-300 hover:text-red-500 transition-colors shrink-0"
        >
          <FiTrash2 size={16} className="sm:w-4.5" />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
