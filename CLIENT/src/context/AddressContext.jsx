/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const [selectedAddress, setSelectedAddress] = useState();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAddresses = async () => {
    axios.defaults.withCredentials = true;
    if (!isLoggedIn) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/address/data`,
      );
      if (res.data.success) {
        setSavedAddresses(res.data.addressData);
        const address = res.data.addressData.filter(
          (addr) => addr.isDefault === true,
        );
        setSelectedAddress(address[0]);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async (e, address) => {
    e.preventDefault();
    console.log(address);
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/address/add`,
        {
          name: address.name,
          phone: address.phone,
          streetAddress: address.street_address,
          city: address.city,
          state: address.state,
          country: address.country,
          postalCode: address.postal_code,
          isDefault: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        getAddresses();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(true);
    }
  };

  const updateAddress = async (e, addressId) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/address/update/${addressId}`,
        { isDefault: true },
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

  useEffect(() => {
    getAddresses(isLoggedIn);
  }, [isLoggedIn]);

  const value = {
    savedAddresses,
    selectedAddress,
    setSelectedAddress,
    isLoading,
    updateAddress,
    addAddress,
  };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const context = useContext(AddressContext);
  return context;
};
