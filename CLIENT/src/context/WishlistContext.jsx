/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishlistContext = createContext();

export const WishlistContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  const [wishlistBooks, setWishlistBooks] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getWishlistData = async () => {
    axios.defaults.withCredentials = true;
    if (!isLoggedIn) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/wishlist/data`,
      );
      if (res.data.success) {
        setWishlistBooks(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (bookId) => {
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/wishlist/add`,
        {
          bookId,
        },
      );
      if (!res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (bookId) => {
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/wishlist/remove/${bookId}`,
      );

      if (!res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = (e, bookId, isLiked, setIsLiked) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      scrollTo(0, 0);
      return;
    }
    if (isLiked) {
      removeFromWishlist(bookId);
      setIsLiked(false);
    } else {
      addToWishlist(bookId);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, [isLoggedIn]);

  const value = { wishlistBooks, toggleWishlist, isLoading, getWishlistData };
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  return context;
};
