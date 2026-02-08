import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";

const Pagination = () => {
  const { archieve } = useBookContext();
  const [serachParams, setSearchParams] = useSearchParams();
  const page = serachParams.get("page") || 1;

  const handleFilterUrl = (field, value) => {
    setSearchParams((searchParams) => {
      searchParams.set(field, value);
      scrollTo(0, 0);
      return searchParams;
    });
  };

  return (
    <div>
      <div className="mt-24 flex flex-col items-center border-t border-stone-100 pt-16">
        <div className="flex items-center justify-between w-full max-w-2xl px-4">
          {/* Left: Refined Previous */}
          <button
            disabled={Number(page) === 1}
            onClick={() => {
              handleFilterUrl("page", Number(page) - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex flex-col items-start gap-1 disabled:opacity-10 transition-all duration-500"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-stone-400 group-hover:text-amber-900 transition-colors">
              Navigate
            </span>
            <div className="flex items-center gap-2 text-[#2C1B18]">
              <FiChevronLeft className="group-hover:-translate-x-2 transition-transform duration-500" />
              <span className="text-xs font-serif italic uppercase tracking-widest">
                Previous
              </span>
            </div>
          </button>

          {/* Center: The Sculptural Progress Rail */}
          <div className="flex flex-col items-center gap-4 flex-1 px-12">
            {/* Current/Total indicator */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif text-[#2C1B18] leading-none">
                {page < 10 ? `0${page}` : page}
              </span>
              <div className="w-6 h-px bg-amber-900/20 rotate-120" />
              <span className="text-sm font-serif italic text-stone-300 leading-none">
                {archieve.totalPages}
              </span>
            </div>
          </div>

          {/* Right: Refined Next */}
          <button
            disabled={Number(page) === Number(archieve.totalPages)}
            onClick={() => {
              handleFilterUrl("page", Number(page) + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex flex-col items-end gap-1 disabled:opacity-10 transition-all duration-500"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-stone-400 group-hover:text-amber-900 transition-colors">
              Navigate
            </span>
            <div className="flex items-center gap-2 text-[#2C1B18]">
              <span className="text-xs font-serif italic uppercase tracking-widest">
                Next
              </span>
              <FiChevronRight className="group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </button>
        </div>

        <p className="mt-8 text-[9px] font-black uppercase tracking-[0.4em] text-stone-300/60">
          Explore the full archive
        </p>
      </div>
    </div>
  );
};

export default Pagination;
