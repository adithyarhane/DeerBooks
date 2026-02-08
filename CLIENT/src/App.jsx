import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layouts/navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import AccountVerification from "./pages/AccountVerification";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/layouts/Footer";
import BookList from "./pages/Booklist";
import BestSellers from "./pages/BestSellers";
import NewReleases from "./pages/NewReleases";
import Aboutus from "./pages/Aboutus";
import BookDetails from "./pages/bookDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Contactus from "./pages/Contactus";
import TermsAndConditions from "./pages/Terms";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/archieve" element={<BookList />} />
        <Route path="/book-details/:slug/:bookId" element={<BookDetails />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/terms-of-services" element={<TermsAndConditions />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/account-verification"
            element={<AccountVerification />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
