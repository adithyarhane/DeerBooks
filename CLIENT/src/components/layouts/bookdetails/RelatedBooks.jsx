/* eslint-disable react-hooks/static-components */
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useBookContext } from "../../../context/BookContext";
import BookCard from "../../ui/BookCard";

const RelatedBooks = () => {
  const { relatedBooks, isLoading } = useBookContext();

  // Skeleton for loading state matching the 5-column grid
  const Skeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-4">
          <div className="aspect-3/4 bg-stone-200 rounded-sm" />
          <div className="h-3 bg-stone-200 w-3/4 rounded" />
          <div className="h-2 bg-stone-100 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="max-w-400 mx-auto mt-6 pb-20 border-t border-stone-200/50 pt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-serif text-[#1C1B1F]">
            Similar{" "}
            <span className="italic font-light text-stone-400">Volumes.</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-amber-700"></span>
            <p className="text-[10px] text-amber-800 font-black tracking-[0.4em] uppercase">
              Curated Recommendation
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Fixed 5 columns on Desktop */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
          {relatedBooks &&
            relatedBooks.slice(0, 5).map((book) => (
              <div
                key={book._id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <BookCard book={book} />
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default RelatedBooks;
