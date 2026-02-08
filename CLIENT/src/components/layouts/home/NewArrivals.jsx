import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { useBookContext } from "../../../context/BookContext";
import BookCard from "../../ui/BookCard";

const NewArrivals = () => {
  const { newReleases, isLoading } = useBookContext();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = window.innerWidth < 1024 ? 300 : current.offsetWidth;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Internal component for the skeleton state
  const SkeletonCard = () => (
    <div className="snap-start shrink-0 w-full animate-pulse">
      <div className="aspect-3/4 bg-stone-200 rounded-2xl mb-4" />{" "}
      {/* Book Cover */}
      <div className="h-4 bg-stone-200 rounded-md w-3/4 mb-2" /> {/* Title */}
      <div className="h-3 bg-stone-100 rounded-md w-1/2" /> {/* Author */}
    </div>
  );

  return (
    <section className="py-6 bg-[#FCF9F2] overflow-hidden">
      <div className="max-w-400 mx-auto px-6">
        {/* TOP SECTION */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-amber-900/30" />
              <span className="text-amber-900 text-[10px] font-black uppercase tracking-[0.5em]">
                Freshly Unbound
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl text-[#2C1B18] font-serif leading-none tracking-tighter">
              New{" "}
              <span className="italic font-light text-amber-900/40">
                Arrivals
              </span>
            </h2>
          </div>

          <div className="hidden sm:flex gap-3">
            <button
              disabled={isLoading}
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#2C1B18]/10 flex items-center justify-center text-[#2C1B18] hover:bg-[#2C1B18] hover:text-white transition-all duration-500 disabled:opacity-30"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              disabled={isLoading}
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-[#2C1B18] flex items-center justify-center text-white hover:bg-amber-900 transition-all duration-500 shadow-lg disabled:opacity-30"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* BOOKS GRID / LOADING STATE */}
        <div className="w-full">
          <div
            ref={scrollRef}
            className={`
              grid grid-flow-col no-scrollbar snap-x snap-mandatory overflow-x-auto pb-12 pt-4 gap-5
              auto-cols-[calc(80%)] 
              md:auto-cols-[calc(33.333%-20px)] 
              lg:auto-cols-[calc(25%-20px)] 
              xl:auto-cols-[calc(20%-16px)]
            `}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {isLoading
              ? // Show 5 Skeletons while loading
                [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
              : newReleases?.slice(0, 10).map((book) => (
                  <div key={book._id} className="snap-start shrink-0">
                    <BookCard book={book} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
