/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiShield, FiTruck } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import useTitle from "../components/useTitle";
import { useWishlistContext } from "../context/WishlistContext";
import BookInfo from "../components/layouts/bookdetails/BookInfo";
import Reviews from "../components/layouts/bookdetails/Reviews";
import ReviewForm from "../components/layouts/bookdetails/reviewForm";
import RelatedBooks from "../components/layouts/bookdetails/RelatedBooks";
import { useReviewContext } from "../context/ReviewContext";

const BookDetails = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { wishlistBooks } = useWishlistContext();
  const { getReviews } = useReviewContext();
  const { fetchBook, book, isLoading } = useBookContext();
  const { slug, bookId } = useParams();

  useTitle(book ? book.title : "Book Details");

  useEffect(() => {
    fetchBook(slug, wishlistBooks, setIsLiked);
    getReviews(bookId);
  }, [slug, wishlistBooks, bookId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f1ea] pt-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 animate-pulse">
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-3/4 bg-stone-200 rounded-2xl shadow-sm" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-white/50 rounded-xl border border-stone-100" />
              <div className="h-14 bg-white/50 rounded-xl border border-stone-100" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="h-12 bg-stone-200 rounded-lg w-3/4" />
              <div className="h-4 bg-stone-200/60 rounded-lg w-1/4" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-stone-200/40 rounded w-full" />
              <div className="h-4 bg-stone-200/40 rounded w-full" />
              <div className="h-4 bg-stone-200/40 rounded w-2/3" />
            </div>
            <div className="h-14 bg-stone-300 rounded-full w-48 mt-12" />
          </div>
        </div>

        <div className="max-w-400 mx-auto px-6 mt-32 pb-28">
          <div className="h-6 w-48 bg-stone-200 rounded mb-10 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-3/4 bg-stone-200 rounded-xl" />
                <div className="h-3 bg-stone-200 w-3/4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    book && (
      <section className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white relative">
        <div className="max-w-7xl mx-auto px-6 pt-28  lg:pt-36 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="group relative aspect-3/4 overflow-hidden bg-[#F5F1EA] rounded-2xl shadow-2xl transition-all duration-700 hover:shadow-emerald-900/5">
                <img
                  src={book.images.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-stone-100 flex items-center gap-3">
                  <FiTruck className="text-emerald-800" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    Fast Registry Delivery
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-stone-100 flex items-center gap-3">
                  <FiShield className="text-emerald-800" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    Collector's Grade
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BookInfo isLiked={isLiked} setIsLiked={setIsLiked} />
            </div>
          </div>

          {showReviewModal && (
            <ReviewForm setShowReviewModal={setShowReviewModal} />
          )}
        </div>
        <div className="max-w-400 mx-auto px-6">
          <Reviews setShowReviewModal={setShowReviewModal} />
        </div>

        <div className="max-w-400 mx-auto px-6">
          <RelatedBooks />
        </div>
      </section>
    )
  );
};

export default BookDetails;
