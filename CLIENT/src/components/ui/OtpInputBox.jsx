import React, { useRef } from "react";

const OtpInputBox = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // --- NEW: PASTE HANDLER ---
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    // Check if pasted content is numeric
    if (!/^\d+$/.test(pasteData)) return;

    const pasteValues = pasteData.split("").slice(0, 6);
    const newOtp = [...otp];

    pasteValues.forEach((value, index) => {
      newOtp[index] = value;
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = value;
      }
    });

    setOtp(newOtp);

    // Focus the last filled input or the 6th input
    const lastIndex = Math.min(pasteValues.length, 5);
    inputRefs.current[lastIndex].focus();
  };
  return (
    <div>
      <div className="flex justify-between gap-2 md:gap-4">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[index] = el)}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e)} // --- ATTACHED HERE ---
            className="w-12 h-16 md:w-14 md:h-20 bg-white border border-[#3E2723]/10 rounded-xl text-center text-2xl font-bold text-[#3E2723] focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInputBox;
