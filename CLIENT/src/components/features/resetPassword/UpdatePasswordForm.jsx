import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiLock,
  FiCheckCircle,
  FiArrowRight,
  FiShield,
  FiAlertCircle,
} from "react-icons/fi";
import { useAuthContext } from "../../../context/AuthContext";
import AuthInputBox from "../../ui/AuthInputBox";

const UpdatePasswordForm = ({ email }) => {
  // Destructuring isLoading from context
  const { ResetPassword, resetOtp, isLoading } = useAuthContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Simple validation logic
  const hasMinLength = password.length >= 8;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const matches = password === confirmPassword && password.length > 0;

  return (
    <div className="min-h-screen w-full flex bg-[#FCF9F2] font-serif">
      {/* 1. LEFT PANEL: EDITORIAL ART */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1A0F0B]">
        <img
          src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2000"
          alt="Ancient Manuscript"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-[#1A0F0B] via-[#1A0F0B]/60 to-transparent" />

        <div className="relative z-10 self-center p-16">
          <div className="flex items-center gap-3 mb-6">
            <FiShield className="text-amber-500" size={24} />
            <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold">
              Archival Security
            </span>
          </div>
          <h2 className="text-6xl text-white leading-tight mb-6">
            Forge a <br />
            <span className="italic font-light text-amber-500">New Key.</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-sm font-sans leading-relaxed">
            Your new credentials must be strong enough to protect your digital
            collection for years to come.
          </p>
        </div>
      </div>

      {/* 2. RIGHT PANEL: NEW PASSWORD FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl text-[#3E2723] mb-3 font-medium">
              Update Password
            </h1>
            <p className="text-[#A1887F] font-sans text-sm italic">
              Please choose a strong password that you haven't used before.
            </p>
          </div>

          <form
            onSubmit={(e) =>
              ResetPassword(
                e,
                email,
                password,
                resetOtp,
                hasMinLength,
                hasSymbol,
                matches,
              )
            }
            className="space-y-6"
          >
            {/* New Password Input */}
            <AuthInputBox
              label="new password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={FiLock}
              disabled={isLoading}
            />

            {/* Confirm Password Input */}
            <AuthInputBox
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              icon={FiCheckCircle}
              disabled={isLoading}
            />

            {/* Password Requirements Checklist */}
            <div className="bg-[#3E2723]/2 border border-[#3E2723]/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/40 mb-1">
                Requirements
              </p>
              {/* Characters */}
              <div className="flex items-center gap-3 text-xs font-sans">
                {hasMinLength ? (
                  <FiCheckCircle className="text-green-600" />
                ) : (
                  <FiAlertCircle className="text-[#A1887F]" />
                )}
                <span
                  className={
                    hasMinLength
                      ? "text-[#3E2723] font-medium"
                      : "text-[#A1887F]"
                  }
                >
                  At least 8 characters
                </span>
              </div>
              {/* Symbol */}
              <div className="flex items-center gap-3 text-xs font-sans">
                {hasSymbol ? (
                  <FiCheckCircle className="text-green-600" />
                ) : (
                  <FiAlertCircle className="text-[#A1887F]" />
                )}
                <span
                  className={
                    hasSymbol ? "text-[#3E2723] font-medium" : "text-[#A1887F]"
                  }
                >
                  One special character (!@#$)
                </span>
              </div>
              {/* Match */}
              <div className="flex items-center gap-3 text-xs font-sans">
                {matches ? (
                  <FiCheckCircle className="text-green-600" />
                ) : (
                  <FiAlertCircle className="text-[#A1887F]" />
                )}
                <span
                  className={
                    matches ? "text-[#3E2723] font-medium" : "text-[#A1887F]"
                  }
                >
                  Passwords match
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // Disabled if requirements aren't met OR if it's already loading
              disabled={!hasMinLength || !hasSymbol || !matches || isLoading}
              className="w-full bg-[#3E2723] hover:bg-[#5D4037] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-950/20 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Updating Seal...
                </>
              ) : (
                <>
                  Update Credentials
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Cancellation Link */}
          <div className="mt-10 text-center">
            <Link
              to="/login"
              className={`text-xs font-sans text-[#A1887F] hover:text-[#3E2723] transition-colors ${isLoading ? "pointer-events-none opacity-50" : ""}`}
            >
              Nevermind, I remembered it.{" "}
              <span className="font-bold border-b border-[#3E2723]/20">
                Back to Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
