/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const ReviewContext = createContext();

export const ReviewContextProvider = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState();

  const getReviews = async (bookId) => {
    if (!isLoggedIn) return;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/user/review/get-reviews/${bookId}`,
        {
          page: 1,
          limit: 5,
          sort: "latest",
        },
      );
      if (res.data.success) {
        setReviews(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addReview = async (e, bookId, review) => {
    e.preventDefault();
    const { rating, comment } = review;
    try {
      setIsLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/user/review/add-review/${bookId}`,
        { rating, comment },
      );

      if (!res.data.success) {
        alert(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const removeReview = async (e, reviewId) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/user/review/delete-review/${reviewId}`,
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const value = { getReviews, addReview, removeReview, isLoading, reviews };
  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  return context;
};
