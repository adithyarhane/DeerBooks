import React from "react";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { useBookContext } from "../../../context/BookContext";
import { useCartContext } from "../../../context/CartContext";
import { useWishlistContext } from "../../../context/WishlistContext";
import useTitle from "../../useTitle";

const BookInfo = ({ isLiked, setIsLiked }) => {
  const { book } = useBookContext();
  const { addToCart } = useCartContext();
  const { toggleWishlist } = useWishlistContext();

  useTitle(book.title);

  return (
    <div className="lg:col-span-7 space-y-10">
      {/* Breadcrumb & Tags */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
          New Arrival
        </span>
        <div className="h-px w-8 bg-stone-200" />
        {book.categories.map((cat) => (
          <span
            key={cat}
            className="text-[10px] font-bold uppercase tracking-widest text-stone-400"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Main Header */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tighter text-[#1C1B1F]">
          {book.title}
        </h1>
        <div className="flex items-center gap-6">
          <p className="text-xl font-serif italic text-stone-500">
            by{" "}
            <span className="text-[#1A1A1A] underline underline-offset-8 decoration-stone-200">
              {book.authors[0].name}
            </span>
          </p>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-stone-100">
            <FiStar className="text-amber-500 fill-amber-500" size={14} />
            <span className="text-xs font-bold">{book.ratings.average}</span>
            <span className="text-[10px] text-stone-400 font-medium">
              ({book.ratings.count})
            </span>
          </div>
        </div>
      </div>

      {/* Price & Inventory */}
      <div className="flex items-end gap-6">
        <div className="space-y-1">
          <p className="text-[9px] font-black uppercase text-stone-400 tracking-widest">
            Market Valuation
          </p>
          <div className="flex items-center gap-3">
            <span className="text-5xl font-serif tracking-tighter">
              ₹{book.pricing.price}
            </span>
            <span className="text-xs text-stone-400 line-through">
              ₹{book.pricing.discountPrice}
            </span>
          </div>
        </div>
        <div className="pb-2">
          <p
            className={`text-[10px] font-black uppercase tracking-widest ${
              book.inventory.stock < 5 ? "text-red-500" : "text-emerald-600"
            }`}
          >
            {book.inventory.stock} Copies in Registry
          </p>
        </div>
      </div>

      {/* Description with Editorial Drop-cap */}
      <div className="max-w-2xl border-t border-stone-100 pt-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-6 italic">
          The Abstract
        </h2>
        <p className="text-lg text-stone-600 font-light leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-[#1A1A1A]">
          {book.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={(e) => addToCart(e, book._id)}
          className="grow flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#1C1B1F] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-950 transition-all duration-500 shadow-xl shadow-stone-200 group"
        >
          <FiShoppingBag className="group-hover:rotate-12 transition-transform" />
          Reserve Volume
        </button>

        <button
          onClick={(e) => {
            toggleWishlist(e, book._id, isLiked, setIsLiked);
          }}
          className={`flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-stone-200 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
            isLiked
              ? "bg-red-50 text-red-500 border-red-100"
              : "hover:bg-stone-50"
          }`}
        >
          <FiHeart className={isLiked ? "fill-current" : ""} />
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default BookInfo;
