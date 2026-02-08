/* eslint-disable react-refresh/only-export-components */
import { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./CartContext";

const PaymentContext = createContext();

export const PaymentContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, userData } = useAuthContext();
  const { getCart } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const placeRazorpayOrder = async (e, shippingAddress) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    if (!isLoggedIn) return;

    const { name, city, state, phone, postalCode, streetAddress, country } =
      shippingAddress;
    if (
      !name ||
      !city ||
      !state ||
      !phone ||
      !postalCode ||
      !streetAddress ||
      !country
    )
      return alert("Fill the all address boxes.");
    if (!userData.isAccountVerified) {
      return toast.error("🔐 Account is not verified.");
    }
    try {
      setIsLoading(true);

      // create order in db
      const orderRes = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/order/create-order-from-cart`,
        {
          paymentMethod: "razorpay",
          shippingAddress: {
            name: name,
            phone: phone,
            streetAddress: streetAddress,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country,
          },
        },
      );

      if (!orderRes.data.success) {
        return toast.error(orderRes.data.message);
      }

      const dbOrder = orderRes.data.data;

      // 2. create razorpay order
      const razorpayRes = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/payment/razorpay/create-razorpay-order`,
        {
          amount: dbOrder.pricing.totalPayable,
          reciept: dbOrder.orderId,
        },
      );

      const razorpayOrder = razorpayRes.data.order;

      // 3. open razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "DeerBooks",
        description: "Secure Payment",
        order_id: razorpayOrder.id,

        handler: async (response) => {
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/payment/razorpay/verify-razorpay-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: dbOrder.orderId,
            },
          );

          if (verifyRes.data.success) {
            navigate("/orders", { replace: true });
            scrollTo(0, 0);
            getCart();
            toast.success("Congratulation ✨");
          }
        },

        prefill: {
          name: "DeerBooks",
          email: "deerbooks@support.com",
          contact: "+91788242424",
        },

        theme: {
          color: "#3E2723",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function () {
        toast.error("Payment failed");
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = { placeRazorpayOrder, isLoading };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  return context;
};
