import React from "react";
import { FiMail, FiArrowRight, FiShield } from "react-icons/fi";
import { RiMailSendLine } from "react-icons/ri";

const NewsLetter = () => {
  return (
    <section className="py-24 bg-[#1A0F0B] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-75 h-75 bg-stone-900 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#241713] rounded-[4rem] p-8 md:p-20 border border-white/5 shadow-2xl overflow-hidden relative">
          {/* Postmark Watermark */}
          <div className="absolute top-10 right-10 opacity-[0.03] select-none pointer-events-none">
            <RiMailSendLine size={280} className="text-white rotate-12" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* 1. TEXT CONTENT */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                <FiMail className="text-amber-500" />
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  Private Correspondence
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1]">
                Join the <br />
                <span className="italic font-light text-stone-500">
                  Bibliophile`s
                </span>{" "}
                <br />
                Registry.
              </h2>

              <p className="text-stone-400 text-lg font-light leading-relaxed max-w-md">
                No advertisements. Only rare acquisition alerts, exhibition
                previews, and the occasional letter from our lead curator.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
                  <FiShield className="text-amber-700" /> Secure Data
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
                  <span className="text-amber-700 font-bold underline">
                    12,000+
                  </span>{" "}
                  Subscribers
                </div>
              </div>
            </div>

            {/* 2. INPUT FORM */}
            <div className="lg:w-1/2 w-full">
              <form
                className="relative group"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative bg-[#1A0F0B] p-2 rounded-[2.5rem] border border-white/10 focus-within:border-amber-500/50 transition-all duration-500 shadow-inner">
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Your correspondence address..."
                      className="flex-1 bg-transparent px-8 py-6 text-white text-lg placeholder:text-stone-600 focus:outline-none font-serif italic"
                    />
                    <button className="bg-white hover:bg-amber-500 text-[#1A0F0B] px-10 py-5 rounded-4xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 group">
                      Acquire Access
                      <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Aesthetic Detail: Card Numbering */}
                <div className="mt-6 flex justify-between items-center px-4">
                  <span className="font-mono text-[9px] text-stone-600 tracking-[0.5em] uppercase">
                    Ref No: ARCH-2026-NWS
                  </span>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-900" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
