import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft, FiArrowRight, FiKey } from "react-icons/fi";
import { useAuthContext } from "../../../context/AuthContext";
import AuthInputBox from "../../ui/AuthInputBox";

const ResetPasswordRequest = ({ email, setEmail }) => {
  const { sendResetOTP, isLoading } = useAuthContext();

  return (
    <div className="min-h-screen w-full flex bg-[#FCF9F2] font-serif">
      {/* 1. LEFT PANEL: EDITORIAL ART */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1A0F0B]">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000"
          alt="Ancient Library Desk"
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#3E2723]/60 to-[#1A0F0B]" />

        <div className="relative z-10 self-center p-16">
          <div className="flex items-center gap-3 mb-6">
            <FiKey className="text-amber-500" size={24} />
            <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold">
              Access Recovery
            </span>
          </div>
          <h2 className="text-6xl text-white leading-tight mb-6">
            Lost Your <br />
            <span className="italic font-light text-amber-500">Seal?</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-sm font-sans leading-relaxed">
            Even the most diligent scribes misplace their keys. We shall help
            you forge a new one.
          </p>
        </div>
      </div>

      {/* 2. RIGHT PANEL: REQUEST FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#A1887F] hover:text-[#3E2723] transition-colors mb-12 text-xs font-bold uppercase tracking-widest group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Entry
          </Link>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
              <h1 className="text-4xl text-[#3E2723] mb-3">Reset Password</h1>
              <p className="text-[#A1887F] font-sans text-sm leading-relaxed">
                Provide your registered email address, and we will send a
                recovery link to your inbox.
              </p>
            </div>

            <form
              className="space-y-8"
              onSubmit={(e) => sendResetOTP(e, email)}
            >
              <AuthInputBox
                label="Registered Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scribe@archive.com"
                icon={FiMail}
                disabled={isLoading} // Prevents input while loading
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3E2723] hover:bg-[#5D4037] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-950/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    {/* --- THE SPINNER --- */}
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Sending..</span>
                  </>
                ) : (
                  <>
                    <span>Send Recovery Link</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-16 pt-8 border-t border-[#3E2723]/5">
            <p className="text-xs font-sans text-[#A1887F]">
              Struggling to remember?{" "}
              <Link
                to="/support"
                className="text-[#3E2723] font-bold hover:underline"
              >
                Speak with an Archivist
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
