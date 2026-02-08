/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiMenu, FiX, FiHeart } from "react-icons/fi";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import MobileMenu from "./MobileMenu.jsx";
import UserMenu from "./UserMenu.jsx";
import { useUiContext } from "../../../context/UiContext.jsx";
import { useCartContext } from "../../../context/CartContext.jsx";
import { navLinks } from "../../../assets/uidata.js";
import { useWishlistContext } from "../../../context/WishlistContext.jsx";

const Navbar = () => {
  const { isLoggedIn } = useAuthContext();
  const { setIsSidebarOpen, setIsSearchOpen, isSearchOpen, setGlobalSearch } =
    useUiContext();
  const { cartData } = useCartContext();
  const { getWishlistData } = useWishlistContext();
  const [search, setSearch] = useState();
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setGlobalSearch(search);
  }, [search]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-1000 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-5"
        }`}
      >
        {/* Updated to max-w-[1600px] to match your other sections */}
        <div className="max-w-400 mx-auto px-6 relative">
          <div
            className={`relative z-20 flex items-center justify-between px-6 h-16 md:h-20 rounded-xl border-b-2 border-[#3E2723]/10 transition-all duration-500 ${
              isScrolled ? "bg-[#FCF9F2] shadow-xl" : "bg-white shadow-md"
            }`}
          >
            {/* 1. LOGO & DESKTOP LINKS */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div>
                  <img
                    className="w-8"
                    src="https://res.cloudinary.com/df7nkydkq/image/upload/v1769506491/Gemini_Generated_Image_sl8lypsl8lypsl8l-removebg-preview_w2f8tp.png"
                    alt="log"
                  />
                </div>
                <span className="text-xl font-serif font-bold text-[#3E2723]">
                  Deer<span className="text-[#A1887F]">Books</span>
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  key={link.name}
                  to={link.href}
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
                    location.pathname === link.href
                      ? "text-[#3E2723] border-b border-[#3E2723]"
                      : "text-[#8D6E63] hover:text-[#3E2723]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* 2. UTILITY & AUTH ACTIONS */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#3E2723] hover:bg-stone-100 rounded-lg transition-colors"
              >
                {isSearchOpen ? <FiX size={20} /> : <FiSearch size={22} />}
              </button>

              {isLoggedIn && (
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                    getWishlistData();
                  }}
                  to="/wishlist"
                  className="relative p-2 text-[#3E2723] hidden lg:block"
                >
                  <FiHeart size={22} />
                </Link>
              )}

              {isLoggedIn && (
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/cart"
                  className="relative p-2 text-[#3E2723] hidden lg:block"
                >
                  <FiShoppingBag size={22} />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#3E2723] text-[8px] text-white rounded-full flex items-center justify-center font-bold">
                    {cartData ? cartData.items.length : "0"}
                  </span>
                </Link>
              )}

              <div className="hidden md:flex items-center gap-4 ml-2 pl-4 border-l border-stone-200">
                {!isLoggedIn ? (
                  <>
                    <Link
                      onClick={() => window.scrollTo(0, 0)}
                      to="/login"
                      className="text-[11px] font-bold uppercase tracking-widest text-[#3E2723] hover:opacity-70"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={() => window.scrollTo(0, 0)}
                      to="/signup"
                      className="px-6 py-2.5 bg-[#3E2723] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#5D4037] transition-all shadow-md"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <UserMenu />
                )}
              </div>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-[#3E2723] ml-1"
              >
                <FiMenu size={28} />
              </button>
            </div>
          </div>

          {/* COMPACT SEARCH DROPDOWN - Alignment matches the inner navbar width */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-full max-w-lg transition-all duration-300 origin-top ${
              isSearchOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white border-2 border-[#3E2723]/5 shadow-2xl rounded-xl p-3 mx-6 md:mx-0">
              <div className="relative">
                <input
                  defaultValue={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search the collection..."
                  className="w-full h-12 bg-[#FAF7F2] rounded-lg pl-4 pr-12 text-[#3E2723] focus:outline-none"
                />
                <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3E2723]" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu />
    </>
  );
};

export default Navbar;
