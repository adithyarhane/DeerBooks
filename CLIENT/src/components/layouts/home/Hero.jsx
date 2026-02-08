/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUiContext } from "../../../context/UiContext";

const Hero = () => {
  const navigate = useNavigate();
  const { setGlobalSearch } = useUiContext();
  const [search, setSearch] = useState();

  useEffect(() => {
    setGlobalSearch(search);
  }, [search]);

  return (
    // Changed: Added flex and items-center to the main section
    <section className="relative min-h-screen w-full overflow-hidden font-serif flex items-center justify-center">
      {/* 1. BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wallpaperaccess.com/full/5487854.jpg"
          alt="Library background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#2D1B14]/90 via-[#2D1B14]/70 to-[#1A0F0B]"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60"></div>
      </div>

      {/* 2. CONTENT AREA */}
      {/* Changed: Removed pt-20, added w-full to ensure container behaves */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 py-12 max-w-5xl mx-auto">
        {/* Sophisticated Label */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="w-6 md:w-12 h-px bg-amber-600/50"></div>
          <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold text-amber-500/80">
            Established Archives • 2026
          </span>
          <div className="w-6 md:w-12 h-px bg-amber-600/50"></div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-7xl lg:text-[90px] font-medium text-[#F5F1EA] leading-[1.1] tracking-tight mb-6 md:mb-8">
          Unlock Hidden <br />
          <span className="italic font-light text-amber-500 drop-shadow-sm">
            Narratives
          </span>
        </h1>

        <p className="max-w-xl text-stone-300/90 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12 px-4">
          A digital sanctuary for bibliophiles. Explore rare volumes, first
          editions, and dive into worlds crafted by master storytellers.
        </p>

        {/* 3. MOBILE-RESPONSIVE SEARCH BOX */}
        <div className="w-full max-w-2xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-2 md:p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full shadow-2xl">
            <div className="flex items-center gap-3 pl-4 grow h-12 md:h-auto">
              <FiSearch className="text-amber-500 text-lg md:text-xl shrink-0" />
              <input
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search archives..."
                className="bg-transparent border-none outline-none text-white placeholder:text-stone-500 w-full text-sm font-sans"
              />
            </div>

            <button
              onClick={() => navigate(`/archieve?search=${search}`)}
              className="h-12 md:h-14 px-8 bg-amber-600 hover:bg-amber-500 text-[#1A0F0B] rounded-xl md:rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <span>Browse</span>
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* 4. GENRE QUICK LINKS (Desktop Only) */}
        <div className="mt-10 md:mt-12 hidden md:flex gap-10">
          {["First Editions", "Manuscripts", "Curated Lists"].map((item) => (
            <button
              key={item}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-amber-500 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* DECORATIVE CORNER ELEMENT */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex flex-col gap-2">
          <div className="w-1 h-1 rounded-full bg-amber-600"></div>
          <div className="w-1 h-12 bg-amber-600/20"></div>
          <span className="text-[9px] text-amber-600/50 uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180 mt-2">
            Catalog 01
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
