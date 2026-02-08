import React from "react";
import { FiEdit3, FiStar, FiTrash2, FiUser } from "react-icons/fi";
import { useAuthContext } from "../../../context/AuthContext";
import { useReviewContext } from "../../../context/ReviewContext";

const Reviews = ({ setShowReviewModal }) => {
  const { userData } = useAuthContext();
  const { reviews, removeReview } = useReviewContext();

  return (
    <section className="mt-4 pt-8 border-t border-stone-100">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-4xl font-serif italic text-[#1C1B1F]">
            Reader Testimonials
          </h2>
          <p className="text-xs text-stone-400 font-light tracking-widest uppercase">
            Community perspective on this edition
          </p>
        </div>
        <button
          onClick={() => setShowReviewModal(true)}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800 border-b border-emerald-800 pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer"
        >
          Write a review{" "}
          <FiEdit3 className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {reviews &&
          reviews.map((review) => (
            <div
              key={review._id}
              // Added 'relative' so the delete button can be positioned absolutely
              className="relative group p-8 rounded-3xl bg-white border border-stone-100 hover:border-emerald-800/20 transition-all duration-500"
            >
              {/* Delete Button */}
              {review.user._id === userData?._id && (
                <button
                  onClick={(e) => removeReview(e, review._id)}
                  className="absolute top-4 right-4 p-2 text-stone-300 hover:text-red-600 transition-colors"
                  aria-label="Delete testimonial"
                >
                  <FiTrash2 size={14} />
                </button>
              )}

              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <FiStar
                    key={j}
                    className="text-amber-400 fill-amber-400"
                    size={10}
                  />
                ))}
              </div>

              <p className="text-sm text-stone-600 font-light leading-relaxed italic">
                "{review.comment}"
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F5F1EA] flex items-center justify-center">
                  <FiUser />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1C1B1F]">
                  {review.user.name}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Reviews;
