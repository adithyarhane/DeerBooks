import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiRotateCw,
  FiKey,
  FiArrowLeft,
  FiLock,
} from "react-icons/fi";
import { useAuthContext } from "../../../context/AuthContext";
import OtpInputBox from "../../ui/OtpInputBox";

const ResetOTPVerify = () => {
  const { setResetOtp, setIsOtpSubmitted } = useAuthContext();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Auto-focus first field on load
  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.join("").length === 6) {
      setIsOtpSubmitted(true);
      setResetOtp(otp.join(""));
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FCF9F2] font-serif">
      {/* 1. LEFT PANEL: THEMED ART */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1A0F0B]">
        <img
          src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2000"
          alt="Old Keys"
          className="absolute inset-0 w-full h-full object-cover opacity-30 sepia hover:sepia-0 transition-all duration-[5s]"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-[#1A0F0B] via-transparent to-transparent" />

        <div className="relative z-10 self-center p-16">
          <div className="flex items-center gap-3 mb-6">
            <FiLock className="text-amber-500" size={24} />
            <span className="text-amber-500 uppercase tracking-[0.4em] text-[10px] font-black">
              Security Protocol
            </span>
          </div>
          <h2 className="text-6xl text-white leading-tight mb-6">
            Verify the <br />
            <span className="italic font-light">Request.</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-sm font-sans leading-relaxed">
            To ensure the safety of your collection, please enter the temporary
            authorization seal.
          </p>
        </div>
      </div>

      {/* 2. RIGHT PANEL: OTP FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Link
            to="/reset-password"
            className="inline-flex items-center gap-2 text-[#A1887F] hover:text-[#3E2723] transition-colors mb-12 text-xs font-bold uppercase tracking-widest group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Change Email
          </Link>

          <div className="mb-10 text-center lg:text-left">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-700 mx-auto lg:mx-0 mb-6 border border-amber-500/20">
              <FiKey size={28} />
            </div>
            <h1 className="text-4xl text-[#3E2723] mb-3">Authorize Reset</h1>
            <p className="text-[#A1887F] font-sans text-sm leading-relaxed">
              A 6-digit reset seal was sent to your email. It will expire in{" "}
              <span className="text-[#3E2723] font-bold">10:00</span>.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-10">
            {/* OTP Grid */}
            <OtpInputBox otp={otp} setOtp={setOtp} />

            <div className="space-y-4">
              <button
                type="submit"
                disabled={otp.join("").length < 6}
                className="w-full bg-[#3E2723] hover:bg-[#5D4037] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-950/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Validate Seal
                <FiShield />
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 text-[#A1887F] hover:text-[#3E2723] transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <FiRotateCw />
                Send New Code
              </button>
            </div>
          </form>

          <div className="mt-16 pt-8 border-t border-[#3E2723]/5">
            <p className="text-xs font-sans text-[#A1887F]">
              Did not receive a code?{" "}
              <Link
                to="/support"
                className="text-[#3E2723] font-bold hover:underline"
              >
                Contact Archivist
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetOTPVerify;
