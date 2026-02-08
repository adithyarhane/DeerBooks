import React from "react";
import { FiArrowRight, FiClock, FiGrid } from "react-icons/fi";
import { useBookContext } from "../context/BookContext";
import useTitle from "../components/useTitle";
import BookCard from "../components/ui/BookCard";

const NewReleases = () => {
  useTitle("New Releases");
  const { newReleases, isLoading } = useBookContext();

  // Skeleton matched to the 5-column grid
  const CardSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="aspect-3/4 bg-stone-200 rounded-sm" />
      <div className="space-y-2">
        <div className="h-3 bg-stone-200 w-3/4 rounded" />
        <div className="h-2 bg-stone-100 w-1/2 rounded" />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FBFBF9] pt-32 pb-16">
      {/* Container matched to 1600px */}
      <div className="max-w-400 mx-auto px-6 relative">
        {/* --- 1. MINIMALIST TITLE SECTION --- */}
        <header className="mb-12 flex flex-row items-end justify-between border-b border-stone-200 pb-10 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiClock className="text-amber-900" size={14} />
              <span className="text-amber-900 text-[9px] font-black uppercase tracking-[0.5em]">
                Latest Acquisitions
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-[#2C1B18] tracking-tighter leading-none">
              New{" "}
              <span className="italic font-light text-stone-300">
                Releases.
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right hidden md:block border-r border-stone-200 pr-8">
              <p className="text-[8px] font-black uppercase text-stone-400 tracking-widest mb-1">
                Update Frequency
              </p>
              <p className="text-sm font-serif italic text-stone-600">
                Every 48 Hours
              </p>
            </div>
            <button className="flex items-center gap-3 bg-[#2C1B18] text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-950 transition-all shadow-xl shadow-stone-900/10 active:scale-95">
              Filter Archive <FiGrid />
            </button>
          </div>
        </header>

        {/* --- 2. GRID OF CARDS (Updated to 5 Columns) --- */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-16">
          {isLoading
            ? // Render 10 skeletons (2 rows) while loading
              [...Array(10)].map((_, i) => <CardSkeleton key={i} />)
            : newReleases &&
              newReleases.map((book) => (
                <div
                  key={book._id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <BookCard book={book} />
                </div>
              ))}
        </section>

        {/* --- 3. THE DISPATCH (NEWSLETTER) --- */}
        <footer className="mt-48 pt-24 border-t border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-5xl mx-auto">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-4xl font-serif text-[#2C1B18] italic">
                The Weekly Dispatch
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                A curated briefing of the week's most significant additions to
                our physical and digital archives. No noise, just literature.
              </p>
            </div>
            <div className="relative group">
              <input
                type="email"
                placeholder="EMAIL@DOMAIN.COM"
                className="w-full bg-transparent border-b-2 border-stone-200 py-6 text-[10px] font-black tracking-[0.3em] outline-none focus:border-amber-900 transition-all placeholder:text-stone-300"
              />
              <button className="absolute right-0 bottom-6 text-stone-400 group-focus-within:text-amber-900 hover:text-[#2C1B18] transition-all transform hover:translate-x-2">
                <FiArrowRight size={24} />
              </button>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-[9px] font-black text-stone-300 uppercase tracking-[1em]">
              Archive Dispatch // Node 04
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default NewReleases;
