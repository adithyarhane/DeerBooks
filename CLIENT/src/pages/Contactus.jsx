import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";
import useTitle from "../components/useTitle";

const Contactus = () => {
  useTitle("Contact Us");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Simulating archival communication setup
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Correspondence Sent:", formData);
    // Add your submit logic here
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-stone-200 border-t-emerald-800 rounded-full animate-spin mx-auto" />
            <FiMessageSquare
              className="absolute inset-0 m-auto text-emerald-800 animate-pulse"
              size={20}
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 animate-pulse">
            Opening Correspondence Lines...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white pb-24">
      {/* 1600px Synchronized Container */}
      <div className="max-w-400 mx-auto px-6 pt-32 lg:pt-40">
        {/* --- HEADER --- */}
        <header className="mb-20 space-y-6 border-b border-stone-200 pb-12">
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-emerald-800"></span>
            <p className="text-[11px] text-emerald-800 font-black tracking-[0.5em] uppercase">
              Inquiries & Assistance
            </p>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-none">
            Contact{" "}
            <span className="italic text-stone-300 font-light">Curators.</span>
          </h1>
          <p className="text-stone-500 font-serif italic text-lg max-w-2xl leading-relaxed">
            Whether you are seeking a rare volume or require assistance with an
            active acquisition, our team is at your disposal.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* --- LEFT: CONTACT INFORMATION (Span 5) --- */}
          <aside className="lg:col-span-5 space-y-12">
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 text-emerald-800 shrink-0">
                  <FiMail size={24} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                    Digital Registry
                  </p>
                  <p className="text-xl font-serif italic hover:text-emerald-800 transition-colors cursor-pointer">
                    curator@archive.com
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 text-emerald-800 shrink-0">
                  <FiPhone size={24} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                    Direct Line
                  </p>
                  <p className="text-xl font-serif italic">
                    +91 (000) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 text-emerald-800 shrink-0">
                  <FiMapPin size={24} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                    Central Repository
                  </p>
                  <p className="text-xl font-serif italic leading-snug">
                    124 Archive Lane, Sector 12
                    <br />
                    New Delhi, India 110001
                  </p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-white/50 rounded-[3rem] border border-white shadow-sm italic font-serif text-stone-500 text-sm leading-relaxed">
              "Every message is treated as a priority. We typically respond
              within one business day of record receipt."
            </div>
          </aside>

          {/* --- RIGHT: CORRESPONDENCE FORM (Span 7) --- */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-stone-200/50 space-y-10 border border-stone-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-2">
                    Your Name
                  </label>
                  <input
                    defaultValue={formData.name}
                    onChange={(e) =>
                      setFormData(() => ({ ...formData, name: e.target.value }))
                    }
                    type="text"
                    placeholder="Enter Name"
                    className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-800/20 transition-all placeholder:text-stone-300 font-serif"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-2">
                    Email Address
                  </label>
                  <input
                    defaultValue={formData.email}
                    onChange={(e) =>
                      setFormData(() => ({
                        ...formData,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    placeholder="Enter Email"
                    className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-800/20 transition-all placeholder:text-stone-300 font-serif"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-2">
                  Your Message
                </label>
                <textarea
                  defaultValue={formData.message}
                  onChange={(e) =>
                    setFormData(() => ({
                      ...formData,
                      message: e.target.value,
                    }))
                  }
                  rows="6"
                  placeholder="How can our curators assist you today?"
                  className="w-full bg-stone-50 border-none rounded-3xl px-6 py-5 focus:ring-2 focus:ring-emerald-800/20 transition-all placeholder:text-stone-300 font-serif resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-6 bg-[#1C1B1F] text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-emerald-950 transition-all flex items-center justify-center gap-4 group shadow-xl"
              >
                Send Correspondence{" "}
                <FiSend className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactus;
