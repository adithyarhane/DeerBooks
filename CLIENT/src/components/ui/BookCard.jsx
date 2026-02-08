import React from "react";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // Destructure with fallbacks to prevent runtime errors
  const {
    title = "Untitled",
    authors = [],
    pricing = {},
    ratings = {},
    images = {},
    tags = [],
    slug = "",
    _id = "",
  } = book || {};

  const handleNavigation = () => {
    if (slug && _id) {
      navigate(`/book-details/${slug}/${_id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleNavigation}
      onKeyDown={(e) => e.key === "Enter" && handleNavigation()}
      role="button"
      tabIndex={0}
      className="group  relative w-full max-w-[320px] mx-auto cursor-pointer outline-none"
    >
      {/* 1. ARTWORK CONTAINER */}
      <div className="relative aspect-2/3 w-full overflow-visible rounded-sm transition-all duration-500 ease-out group-hover:-translate-y-2 sm:group-hover:-translate-y-3">
        {/* Soft Depth Shadow */}
        <div className="absolute inset-0 z-0 bg-[#3E2723]/20 rounded-sm blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 translate-y-8" />

        {/* The Book Image */}
        <div className="relative z-10 w-full h-full overflow-hidden rounded-sm border border-[#3E2723]/5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <img
            src={images?.cover || "/placeholder-book.jpg"}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A0F0B]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* 2. TEXT CONTENT */}
      <div className="mt-4 sm:mt-6 px-0.5 space-y-1 sm:space-y-2">
        {/* Author & Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#A1887F] truncate max-w-[70%]">
            {authors?.[0]?.name || "Unknown Author"}
          </span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 rounded text-amber-700">
            <FiStar size={10} className="sm:size-4 fill-current" />
            <span className="text-[8px] sm:text-[10px] font-bold">
              {ratings?.average || "N/A"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[#3E2723] font-serif text-lg sm:text-xl lg:text-2xl leading-tight group-hover:text-amber-900 transition-colors duration-300 line-clamp-2 min-h-[2.5em] sm:min-h-0">
          {title}
        </h3>

        {/* Tags & Price */}
        <div className="flex items-center justify-between pt-0.5 sm:pt-1">
          <div className="flex gap-1.5">
            {tags?.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="text-[7px] sm:text-[9px] font-bold uppercase tracking-widest text-[#3E2723]/40 border border-[#3E2723]/10 px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-base sm:text-lg font-sans font-semibold text-[#3E2723]">
            ₹{pricing?.price || 0}
          </span>
        </div>
      </div>

      {/* 3. INTERACTIVE DECORATION */}
      <div className="mt-3 hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-transparent group-hover:text-[#3E2723] transition-all duration-500">
        <span>View Details</span>
        <FiArrowRight className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-500" />
      </div>
    </div>
  );
};

export default BookCard;
