import React from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import useTitle from "../components/useTitle";
import { useNavigate } from "react-router-dom";
import { useWishlistContext } from "../context/WishlistContext";
import BookCard from "../components/ui/BookCard";

const Wishlist = () => {
  useTitle("Your Wishlist");
  const navigate = useNavigate();

  const { wishlistBooks, isLoading } = useWishlistContext();

  const isEmpty = !isLoading && (!wishlistBooks || wishlistBooks.length === 0);

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white pb-20">
      {/* Container updated to 1600px */}
      <div className="max-w-400 mx-auto px-6 pt-32">
        {/* --- HEADER & SUMMARY --- */}
        <header className="flex flex-row justify-between items-end mb-6 gap-8 border-b border-stone-200 pb-10">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-serif tracking-tighter leading-none">
              Your{" "}
              <span className="italic font-light text-stone-300">
                Wishlist.
              </span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 text-right">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
                Total Volumes
              </p>
              <p className="text-3xl font-serif text-[#1A1A1A]">
                {isLoading ? "..." : wishlistBooks?.length || 0}
              </p>
            </div>
          </div>
        </header>

        {/* --- GRID INTERFACE: Updated to 5 Columns --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-16">
          {isLoading ? (
            /* Show Skeletons matching the 5-column grid */
            Array.from({ length: 10 }).map((_, i) => <BookSkeleton key={i} />)
          ) : isEmpty ? (
            /* Sophisticated Empty State */
            <div className="col-span-full py-40 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-300">
                <FiHeart size={28} className="text-[#3E2723]" />
              </div>
              <div className="space-y-2">
                <p className="font-serif text-2xl text-stone-400 italic">
                  Your wishlist is currently empty.
                </p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  Curate your personal wishlist from our archives
                </p>
              </div>
              <button
                onClick={() => navigate("/book-list")}
                className="mt-4 px-8 py-4 bg-[#2C1B18] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-amber-950 transition-all"
              >
                + Start Adding to Collection
              </button>
            </div>
          ) : (
            /* Render Wishlist Books */
            wishlistBooks.map((item) => (
              <div
                key={item._id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <BookCard book={item.book} />
              </div>
            ))
          )}
        </div>

        {/* --- FOOTER --- */}
        {!isEmpty && (
          <footer className="mt-32 text-center border-t border-stone-200 pt-16 pb-12">
            <button
              onClick={() => navigate("/book-list")}
              className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-amber-900 hover:text-[#1A1A1A] transition-all group"
            >
              Explore the Full Archive{" "}
              <FiArrowRight className="group-hover:translate-x-3 transition-transform duration-500" />
            </button>
          </footer>
        )}
      </div>
    </main>
  );
};

export default Wishlist;

const BookSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="aspect-3/4 w-full bg-stone-200 rounded-sm mb-6" />
    <div className="space-y-4 px-1">
      <div className="flex justify-between items-center">
        <div className="h-2 w-24 bg-stone-200 rounded" />
        <div className="h-2 w-10 bg-stone-200 rounded" />
      </div>
      <div className="h-6 w-full bg-stone-200 rounded" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 w-16 bg-stone-200 rounded" />
        <div className="h-5 w-20 bg-stone-300 rounded" />
      </div>
    </div>
  </div>
);
