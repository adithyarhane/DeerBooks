import React, { useState, useEffect } from "react";
import {
  FiShield,
  FiFileText,
  FiGlobe,
  FiAlertCircle,
  FiChevronRight,
} from "react-icons/fi";
import useTitle from "../components/useTitle";

const TermsAndConditions = () => {
  useTitle("Terms & Conditions");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating legal document retrieval
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      title: "Acquisition Protocol",
      content:
        "By placing an order, you are entering into a formal agreement to acquire curated volumes. All transactions are subject to availability and verification of the archive's records.",
    },
    {
      title: "Intellectual Property",
      content:
        "The content, design, and 'Archival' aesthetic of this platform are protected by intellectual property laws. Reproduction of any digital assets without curator consent is strictly prohibited.",
    },
    {
      title: "Registry Accuracy",
      content:
        "Users are responsible for providing accurate delivery coordinates. We are not liable for shipments lost due to incorrect ledger entries provided during the checkout phase.",
    },
    {
      title: "Returns & Restocking",
      content:
        "Curated items may be returned within 14 days of receipt, provided they remain in 'Pristine Archive' condition. A restocking fee may apply to specialized volumes.",
    },
  ];

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-stone-200 border-t-emerald-800 rounded-full animate-spin mx-auto" />
            <FiShield
              className="absolute inset-0 m-auto text-emerald-800 animate-pulse"
              size={20}
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 animate-pulse">
            Retrieving Legal Framework...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#1A1A1A] selection:bg-[#7a4a2e] selection:text-white pb-32">
      {/* 1600px Synchronized Container */}
      <div className="max-w-400 mx-auto px-6 pt-32 lg:pt-40">
        {/* --- HEADER --- */}
        <header className="mb-20 space-y-6 border-b border-stone-200 pb-12">
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-emerald-800"></span>
            <p className="text-[11px] text-emerald-800 font-black tracking-[0.5em] uppercase">
              Legal Framework
            </p>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-none">
            Terms of{" "}
            <span className="italic text-stone-300 font-light">Service.</span>
          </h1>
          <p className="text-stone-500 font-serif italic text-lg max-w-2xl leading-relaxed">
            Please review the governing protocols that define our relationship
            and your responsibilities as a collector.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* --- LEFT: TABLE OF CONTENTS (Span 4) --- */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit">
            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6 px-2">
                Document Sections
              </h2>
              <nav className="space-y-2">
                {sections.map((sec, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 transition-colors text-left group"
                  >
                    <span className="text-sm font-serif">{sec.title}</span>
                    <FiChevronRight className="text-stone-300 group-hover:text-emerald-800 transition-colors" />
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4 px-8 py-6 bg-emerald-50 rounded-3xl border border-emerald-100">
              <FiAlertCircle className="text-emerald-800 shrink-0" size={20} />
              <p className="text-[10px] font-bold text-emerald-900 leading-relaxed uppercase tracking-widest">
                Last Updated: January 2026
              </p>
            </div>
          </aside>

          {/* --- RIGHT: CONTENT (Span 8) --- */}
          <div className="lg:col-span-8 space-y-16">
            <section className="prose prose-stone max-w-none">
              <div className="space-y-16">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-stone-300 font-sans">
                        0{index + 1}
                      </span>
                      <h3 className="text-2xl font-serif tracking-tight">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-stone-600 font-serif leading-relaxed text-lg pl-8 border-l border-stone-100">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Final Statement */}
              <div className="mt-24 pt-12 border-t border-stone-200">
                <p className="text-stone-400 font-serif italic text-sm text-center max-w-xl mx-auto">
                  "By continuing to use this platform, you acknowledge that you
                  have read and understood these archival protocols in their
                  entirety."
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;
