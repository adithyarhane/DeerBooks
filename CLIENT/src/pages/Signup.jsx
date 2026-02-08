import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiBookOpen,
  FiBookmark,
  FiCheckCircle,
} from "react-icons/fi";
import { useAuthContext } from "../context/AuthContext";
import useTitle from "../components/useTitle";
import AuthInputBox from "../components/ui/AuthInputBox";

const Signup = () => {
  useTitle("Signup");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // Destructured isLoading from your AuthContext
  const { signup, isLoading } = useAuthContext();

  return (
    <div className="min-h-screen w-full flex bg-[#FCF9F2] font-serif">
      {/* 1. LEFT PANEL: EDITORIAL ART (Pinned to left, hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1A0F0B]">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000"
          alt="Vintage Bookshelf"
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-[10s] hover:scale-110"
        />
        {/* Dark warm overlay - Fixed Gradient syntax */}
        <div className="absolute inset-0 bg-linear-to-b from-[#3E2723]/60 to-[#1A0F0B]/90" />

        <div className="relative z-10 self-center p-16">
          <div className="flex items-center gap-3 mb-8">
            <FiBookmark className="text-amber-500" size={24} />
            <span className="text-amber-500 uppercase tracking-[0.5em] text-xs font-bold">
              Membership Registration
            </span>
          </div>

          <h2 className="text-6xl text-white leading-tight mb-8">
            Begin Your <br />
            <span className="italic font-light text-amber-500">Journey.</span>
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-amber-500/20 p-2 rounded-lg">
                <FiCheckCircle className="text-amber-500" />
              </div>
              <p className="text-stone-300 font-sans text-sm italic">
                Access to rare, first-edition digital manuscripts.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-amber-500/20 p-2 rounded-lg">
                <FiCheckCircle className="text-amber-500" />
              </div>
              <p className="text-stone-300 font-sans text-sm italic">
                Curated newsletters from master archivists.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-amber-500/20 p-2 rounded-lg">
                <FiCheckCircle className="text-amber-500" />
              </div>
              <p className="text-stone-300 font-sans text-sm italic">
                Personalized reading lounge and wishlist.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT PANEL: SIGNUP FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 py-32 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Branding */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-8 lg:hidden"
            >
              <FiBookOpen className="text-[#3E2723]" size={20} />
              <span className="font-bold text-[#3E2723] uppercase tracking-widest text-sm font-sans">
                DeerBooks
              </span>
            </Link>
            <h1 className="text-4xl text-[#3E2723] mb-3 font-serif">
              Join the Society
            </h1>
            <p className="text-[#A1887F] font-sans text-sm italic">
              Register to unlock the full potential of our digital library.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => signup(e, name, email, password)}
          >
            {/* Full Name Input */}
            <AuthInputBox
              label={"Full Name"}
              type="text"
              placeholder="Theodore Scribe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
              icon={FiUser}
            />

            {/* Email Input */}
            <AuthInputBox
              label={"Email Address"}
              type="text"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              icon={FiMail}
            />

            {/* Password Input */}
            <AuthInputBox
              label={"Password"}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              icon={FiLock}
            />

            {/* Terms of Service */}
            <div className="px-1 py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 accent-[#3E2723] border-[#3E2723]/20 rounded transition-all cursor-pointer"
                  />
                </div>
                <span className="text-[11px] font-sans text-[#5D4037] leading-tight">
                  I agree to the{" "}
                  <span className="underline decoration-amber-500/50">
                    Society Bylaws
                  </span>{" "}
                  and the curation of my digital experience.
                </span>
              </label>
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#3E2723] hover:bg-[#5D4037] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-950/20 active:scale-[0.98] mt-4 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Register Account
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Bottom Footer Link */}
          <div className="mt-8 text-center border-t border-[#3E2723]/5 pt-8">
            <p className="text-sm font-sans text-[#A1887F]">
              Already have a membership?{" "}
              <Link
                to="/login"
                className="text-[#3E2723] font-bold border-b border-[#3E2723]/20 hover:border-[#3E2723] transition-all pb-0.5"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
