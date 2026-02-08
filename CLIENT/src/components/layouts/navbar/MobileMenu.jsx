import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../../assets/uidata.js";
import {
  FiArrowRight,
  FiBook,
  FiUser,
  FiX,
  FiLogOut,
  FiShoppingBag,
  FiHeart,
  FiPackage,
} from "react-icons/fi";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { useUiContext } from "../../../context/UiContext.jsx";

const MobileMenu = () => {
  const { isLoggedIn, userData, logout } = useAuthContext();
  const { isSidebarOpen, setIsSidebarOpen } = useUiContext();

  const shopLinks = [
    {
      name: "My Cart",
      path: "/cart",
      icon: <FiShoppingBag size={18} />,
      badge: true,
    },
    { name: "Wishlist", path: "/wishlist", icon: <FiHeart size={18} /> },
    { name: "My Orders", path: "/orders", icon: <FiPackage size={18} /> },
  ];

  return (
    <div className="font-serif">
      {/* 1. LAYERED OVERLAY */}
      <div
        className={`fixed inset-0 z-1100 bg-[#1A0F0B]/60 backdrop-blur-md transition-opacity duration-700 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* 2. SIDEBAR PANEL */}
      <aside
        className={`fixed top-0 left-0 z-1200 h-full w-[85%] max-w-85 bg-[#FCF9F2] transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative p-8 flex flex-col h-full z-10">
          {/* HEADER: Archive Branding */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <FiBook className="text-[#3E2723]" size={18} />
                <span className="font-bold text-[#3E2723] uppercase tracking-[0.2em] text-[10px]">
                  BookSky
                </span>
              </div>
              <span className="text-[9px] text-[#A1887F] uppercase tracking-[0.4em] font-sans font-bold">
                Digital Archive
              </span>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-10 h-10 rounded-full border border-[#3E2723]/10 flex items-center justify-center text-[#3E2723] active:scale-90 transition-transform"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="flex flex-col overflow-y-auto pr-2 custom-scrollbar">
            {/* Main Links */}
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className="group py-4 border-b border-[#3E2723]/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-sans font-bold text-[#A1887F]">
                    0{idx + 1}
                  </span>
                  <span className="text-lg font-medium text-[#3E2723] tracking-tight group-hover:italic transition-all group-hover:pl-2">
                    {link.name}
                  </span>
                </div>
                <FiArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-600" />
              </Link>
            ))}

            {/* Added: Shop & Personal Links Section */}
            {isLoggedIn && (
              <div className="mt-6 pt-4">
                <p className="text-[9px] font-sans font-black uppercase tracking-[0.3em] text-[#A1887F] mb-4">
                  Personal Collection
                </p>
                <div className="space-y-1">
                  {shopLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#3E2723]/5 transition-colors group"
                    >
                      <div className="flex items-center gap-4 text-[#3E2723]">
                        <span className="text-[#A1887F] group-hover:text-amber-600 transition-colors">
                          {item.icon}
                        </span>
                        <span className="text-sm font-semibold tracking-wide">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* FOOTER: Auth & Actions */}
          <div className="mt-auto pt-8">
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center h-14 border border-[#3E2723]/20 text-[#3E2723] font-bold uppercase text-[10px] tracking-widest rounded-lg hover:bg-stone-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center h-14 bg-[#3E2723] text-white font-bold uppercase text-[10px] tracking-widest rounded-lg shadow-xl shadow-amber-950/20"
                >
                  Join Us
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/profile"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-between p-4 bg-white border border-[#3E2723]/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-[#3E2723]">
                      <FiUser size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-sans font-bold text-[#A1887F] uppercase tracking-widest">
                        Welcome back
                      </p>
                      <p className="text-[#3E2723] font-bold text-sm">
                        {userData ? `Mr. ${userData.name}` : "Guest"}
                      </p>
                    </div>
                  </div>
                  <FiArrowRight className="text-[#A1887F]" />
                </Link>

                <button
                  onClick={(e) => {
                    logout(e);
                    setIsSidebarOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 text-[#A1887F] hover:text-red-700 transition-colors text-[11px] font-bold uppercase tracking-widest"
                >
                  <FiLogOut /> Sign Out
                </button>
              </div>
            )}

            <p className="text-center mt-6 text-[9px] uppercase tracking-[0.4em] text-[#A1887F] opacity-50 font-sans font-bold">
              Est. 2026 • Premium Library
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
