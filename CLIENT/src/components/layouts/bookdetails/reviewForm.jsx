import React, { useState } from "react";
import { FiStar, FiX } from "react-icons/fi";
import { useBookContext } from "../../../context/BookContext";
import { useReviewContext } from "../../../context/ReviewContext";

const ReviewForm = ({ setShowReviewModal }) => {
  const { book } = useBookContext();
  const { addReview } = useReviewContext();

  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      {/* Backdrop Blur */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setShowReviewModal(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="p-8 sm:p-12">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <h3 className="text-3xl font-serif text-[#1C1B1F]">
                Draft a Review
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                Recording for {book.title}
              </p>
            </div>
            <button
              onClick={() => setShowReviewModal(false)}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Rating Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                Assigned Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() =>
                      setReview((review) => ({ ...review, rating: num }))
                    }
                    className={`transition-all hover:scale-110 ${review.rating >= num ? "text-amber-500" : "text-stone-200"}`}
                  >
                    <FiStar
                      size={28}
                      fill={review.rating >= num ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                Your Testimony
              </label>
              <textarea
                defaultValue={review.comment}
                onChange={(e) =>
                  setReview((review) => ({
                    ...review,
                    comment: e.target.value,
                  }))
                }
                rows="4"
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-800 transition-colors resize-none placeholder:italic placeholder:text-stone-300"
                placeholder="Reflect on your journey through this volume..."
              />
            </div>

            <button
              onClick={(e) => {
                addReview(e, book._id, review);
                setShowReviewModal(false);
              }}
              className="w-full py-5 bg-[#1C1B1F] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-950 transition-all shadow-lg"
            >
              Submit to Archive
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
