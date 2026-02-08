/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [resetOtp, setResetOtp] = useState();

  const getUserData = async () => {
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/user/info`,
      );
      if (res.data.success) {
        setUserData(res.data.userData);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (e, name, email, password) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/signup`,
        {
          name,
          email,
          password,
        },
      );
      if (res.data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (e, email, password) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/login`,
        {
          email,
          password,
        },
      );

      if (res.data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/logout`,
      );

      if (res.data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationOTP = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/send-verification-otp`,
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/account-verification");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const verifyAccount = async (e, otp) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/verify-account`,
        {
          otp,
        },
      );
      if (res.data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
        toast.success(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendResetOTP = async (e, email) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/send-reset-otp`,
        {
          email,
        },
      );
      if (res.data.success) {
        setIsEmailSent(true);
        toast.success(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const ResetPassword = async (
    e,
    email,
    password,
    resetOtp,
    hasMinLength,
    hasSymbol,
    matches,
  ) => {
    e.preventDefault();

    if (!hasMinLength || !hasSymbol) {
      return alert("Use strong password");
    }
    if (!matches) {
      return alert("Passwords do not match.");
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/reset-password`,
        {
          email,
          otp: resetOtp,
          newPassword: password,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
    const getAuthState = async () => {
      axios.defaults.withCredentials = true;
      try {
        setAuthLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/auth/is-auth`,
        );

        if (res.data.success) {
          setIsLoggedIn(true);
          getUserData();
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setAuthLoading(false);
      }
    };
    getAuthState();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    login,
    signup,
    logout,
    sendVerificationOTP,
    verifyAccount,
    sendResetOTP,
    ResetPassword,
    isLoading,
    authLoading,
    isOtpSubmitted,
    setIsOtpSubmitted,
    isEmailSent,
    setIsEmailSent,
    resetOtp,
    setResetOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
