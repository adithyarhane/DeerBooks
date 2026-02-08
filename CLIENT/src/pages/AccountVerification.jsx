import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShield, FiRotateCw, FiMail, FiCheckCircle } from "react-icons/fi";
import useTitle from "../components/useTitle";
import { useAuthContext } from "../context/AuthContext";
import OtpInputBox from "../components/ui/OtpInputBox";

const AccountVerification = () => {
  useTitle("Verify Account");
  const { userData, verifyAccount } = useAuthContext();
  const [otp, setOtp] = useState(new Array(6).fill(""));

  return (
    <div className="min-h-screen w-full flex bg-[#FCF9F2] font-serif">
      {/* 1. LEFT PANEL: SECURITY ART */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1A0F0B]">
        <img
          src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2000"
          alt="Ancient Seal"
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-[#1A0F0B] via-[#1A0F0B]/80 to-transparent" />

        <div className="relative z-10 self-center p-16">
          <div className="flex items-center gap-3 mb-6">
            <FiShield className="text-amber-500" size={24} />
            <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold">
              Identity Protection
            </span>
          </div>
          <h2 className="text-6xl text-white leading-tight mb-6">
            Protect the <br />
            <span className="italic font-light">Archive.</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-sm font-sans leading-relaxed">
            Every member is a guardian of knowledge. Please verify your seal to
            gain full access.
          </p>
        </div>
      </div>

      {/* 2. RIGHT PANEL: VERIFICATION FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md text-center lg:text-left">
          <div className="mb-10">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-700 mx-auto lg:mx-0 mb-6 border border-amber-500/20">
              <FiMail size={28} className="animate-bounce" />
            </div>
            <h1 className="text-4xl text-[#3E2723] mb-3">
              Verification Required
            </h1>
            <p className="text-[#A1887F] font-sans text-sm leading-relaxed">
              We have sent a 6-digit OTP to{" "}
              <span className="text-[#3E2723] font-bold">
                {userData?.email}
              </span>
              . Please enter it below to confirm your soul's entry.
            </p>
          </div>

          <div className="space-y-8">
            {/* OTP Input Grid */}
            <OtpInputBox otp={otp} setOtp={setOtp} />

            <div
              onClick={(e) => verifyAccount(e, otp.join(""))}
              className="space-y-4"
            >
              <button className="w-full bg-[#3E2723] hover:bg-[#5D4037] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-950/20 active:scale-[0.98]">
                Verify Identity
                <FiCheckCircle />
              </button>

              <button className="w-full flex items-center justify-center gap-2 py-2 text-[#A1887F] hover:text-[#3E2723] transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
                <FiRotateCw />
                Resend New OTP
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-[#3E2723]/5">
              <p className="text-xs font-sans text-[#A1887F]">
                Lost your key?{" "}
                <Link
                  to="/support"
                  className="text-[#3E2723] font-bold hover:underline"
                >
                  Contact the Librarian
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
