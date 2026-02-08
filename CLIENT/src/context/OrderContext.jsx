/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import generateTrackingSteps from "../utils/generateTrackingSteps";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const [ordersData, setOrdersData] = useState();
  const [order, setOrder] = useState();
  const [trackSteps, setTrackSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrdersData = async () => {
    axios.defaults.withCredentials = true;
    if (!isLoggedIn) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/order/data`,
      );
      if (res.data.success) {
        setOrdersData(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (orderId) => {
    axios.defaults.withCredentials = true;
    if (!isLoggedIn) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/order/${orderId}`,
      );
      if (res.data.success) {
        setOrder(res.data.data);
        setTrackSteps(generateTrackingSteps(res.data.data));
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    ordersData,
    isLoading,
    getOrdersData,
    getOrderById,
    order,
    trackSteps,
  };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  return context;
};
