/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiGrid, FiList, FiSearch } from "react-icons/fi";

import { categories } from "../../assets/uidata";
import { useSearchParams } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";
import { useUiContext } from "../../context/UiContext";

const Filters = () => {
  const [serachParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState();
  const { fetchBooksData } = useBookContext();
  const { viewMode, setViewMode, setGlobalSearch } = useUiContext();
  const page = serachParams.get("page") || 1;
  const searchQuery = serachParams.get("search");
  const category = serachParams.get("category") || "all";

  useEffect(() => {
    fetchBooksData(page, category, searchQuery);
  }, [page, searchQuery, category]);

  useEffect(() => {
    setGlobalSearch(search);
  }, [search]);

  return (
    <div className="sticky top-0 z-30 bg-[#FCF9F2]/80 backdrop-blur-md py-3 mb-6 border-b border-stone-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setGlobalSearch();
                setSearchParams({ category: cat.toLowerCase() });
              }}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                category === cat.toLowerCase()
                  ? "bg-[#2C1B18] text-white shadow-lg"
                  : "bg-white text-[#2C1B18] border border-stone-200 hover:border-amber-900/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search titles..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-900/40 transition-colors"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-amber-900" : "text-stone-400"}`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-amber-900" : "text-stone-400"}`}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
