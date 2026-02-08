/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState();
  const [isLoading, setIsLoading] = useState();

  const getCart = async () => {
    axios.defaults.withCredentials = true;
    if (!isLoggedIn) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/cart/data`,
      );

      if (res.data.success) {
        setCartData(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (e, bookId) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    if (!isLoggedIn) {
      return navigate("/login");
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/cart/add`,
        {
          bookId,
          quantity: 1,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        getCart();
      } else {
        alert(res.data.message);
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const updateQuantity = async (e, bookId, quantity) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/cart/update/${bookId}`,
        { quantity },
      );
      if (res.data.success) {
        getCart();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (e, bookId) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/cart/remove/${bookId}`,
      );
      if (res.data.success) {
        getCart();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [isLoggedIn]);

  const value = {
    cartData,
    getCart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  return context;
};
