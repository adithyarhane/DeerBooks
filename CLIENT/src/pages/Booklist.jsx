import React from "react";
import { useBookContext } from "../context/BookContext";
import { useUiContext } from "../context/UiContext";
import useTitle from "../components/useTitle";
import BookCard from "../components/ui/BookCard";
import Pagination from "../components/features/Pagination";
import Filters from "../components/features/Filters";

const BookList = () => {
  const { archieve, setSearch, isLoading } = useBookContext();
  const { viewMode } = useUiContext();

  useTitle("Book List");

  // Skeleton for the grid view
  const Skeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="aspect-3/4 bg-stone-200 rounded-2xl" />
      <div className="h-4 bg-stone-200 w-3/4 rounded" />
      <div className="h-3 bg-stone-100 w-1/2 rounded" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FCF9F2] pt-26 lg:pt-32 pb-20">
      {/* Updated to match your 1600px standard width */}
      <div className="max-w-400 mx-auto px-6">
        {/* --- SECTION 1: EDITORIAL HEADER --- */}
        <header className="">
          <div className="flex flex-row justify-between items-end gap-6 border-b border-stone-200 pb-8">
            <div className="space-y-2 ">
              <h1 className="text-2xl md:text-4xl font-serif text-[#2C1B18] tracking-tighter flex flex-wrap items-baseline gap-x-2 leading-none">
                <span>Archieve</span>
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="h-12 w-px bg-stone-200 hidden md:block" />
              <div className="flex flex-col items-end">
                <p className="text-xl font-serif italic text-[#2C1B18] leading-none">
                  {isLoading ? "..." : archieve?.totalBooks || 0}
                </p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 mt-2">
                  Total Editions
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* --- SECTION 2: FILTERS & SEARCH --- */}
        <Filters />

        {/* --- SECTION 3: THE GRID --- */}
        <div className="mt-2">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : archieve?.totalBooks > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12"
                    : "flex flex-col gap-6"
                }
              >
                {archieve.data.map((book) => (
                  <div
                    key={book._id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>

              {/* --- PAGINATION CONTROLS --- */}
              <Pagination />
            </>
          ) : (
            <div className="py-40 text-center">
              <p className="font-serif text-4xl text-stone-300 italic">
                No volumes found.
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-amber-900 hover:text-amber-700 transition-colors underline underline-offset-8"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookList;
