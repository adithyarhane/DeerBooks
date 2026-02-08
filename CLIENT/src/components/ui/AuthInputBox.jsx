import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthInputBox = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#3E2723]/60 ml-1">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1887F] group-focus-within:text-amber-600 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          defaultValue={value}
          onChange={onChange}
          type={inputType}
          required={required}
          placeholder={placeholder}
          className={`w-full bg-white border border-[#3E2723]/10 py-4 ${Icon ? "pl-12" : "pl-4"} ${isPassword ? "pr-12" : "pr-4"} rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-sans text-sm shadow-sm placeholder:text-stone-400`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A1887F] hover:text-amber-700 transition-colors"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInputBox;
