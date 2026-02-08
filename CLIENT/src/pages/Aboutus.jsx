import React from "react";
import {
  FiArrowRight,
  FiTarget,
  FiHash,
  FiShield,
  FiLayers,
  FiGlobe,
} from "react-icons/fi";
import useTitle from "../components/useTitle";

const Aboutus = () => {
  useTitle("About Us");

  const stats = [
    { label: "Volumes", value: "12.4k" },
    { label: "Archivists", value: "14" },
    { label: "Nodes", value: "08" },
    { label: "Uptime", value: "99.9%" },
  ];

  const values = [
    {
      icon: <FiTarget />,
      title: "Precision",
      text: "We capture every detail, from the ink bleed to the paper texture with ultra-high resolution imaging.",
    },
    {
      icon: <FiShield />,
      title: "Security",
      text: "End-to-end encryption ensures the archive remains tamper-proof and physically decentralized.",
    },
    {
      icon: <FiLayers />,
      title: "Vision",
      text: "We are building a multi-generational library designed to outlast current digital formats.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-amber-100 pb-20">
      {/* --- 1. EDITORIAL HERO SECTION --- */}
      <section className="max-w-400 mx-auto px-6 pt-32 md:pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center gap-4 text-amber-700/60 font-black text-[10px] uppercase tracking-[0.5em]">
              <FiHash className="text-amber-600" /> Archive Identity // 2026
            </div>
            <h1 className="text-6xl md:text-[100px] font-serif tracking-tighter leading-[0.9] text-[#2C1B18]">
              Preserving <br />
              <span className="italic font-light text-stone-300">
                Thought
              </span>, <br />
              <span className="pl-0 md:pl-20">One Node at a time.</span>
            </h1>
            <p className="max-w-xl text-stone-500 text-lg md:text-xl font-light leading-relaxed border-l-2 border-amber-100 pl-8 ml-0 md:ml-20">
              The Nexus Archive is a curated sanctuary for the world's most
              significant literature, bridging the gap between physical history
              and digital permanence.
            </p>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="aspect-4/5 overflow-hidden rounded-4xl shadow-2xl shadow-stone-900/10">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600"
                alt="Archive Hall"
                className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-[2s] scale-110 group-hover:scale-100"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-xl border border-stone-50 max-w-50">
              <FiGlobe className="text-amber-600 mb-4" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                Global Reach
              </p>
              <p className="text-sm font-serif italic">
                Distributed across 8 global nodes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE STATS BAR --- */}
      <section className="max-w-400 mx-auto px-6 mt-40">
        <div className="bg-stone-900 rounded-[2.5rem] py-16 px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-white relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full" />

          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative z-10 space-y-2 text-center md:text-left"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-500">
                {stat.label}
              </p>
              <p className="text-5xl font-serif italic text-amber-50">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. CORE MISSION & IMAGE --- */}
      <section className="max-w-400 mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-4 sticky top-32">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-6">
              Our Purpose
            </h2>
            <h3 className="text-4xl font-serif leading-tight text-[#2C1B18]">
              We believe knowledge shouldn't have an expiration date.
            </h3>
            <div className="h-1 w-20 bg-amber-600 mt-8" />
          </div>

          <div className="lg:col-span-8 space-y-16">
            <div className="relative aspect-video rounded-4xl overflow-hidden group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1600"
                alt="Minimalist Library"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/20" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                  Cataloguing
                </p>
                <p className="text-2xl font-serif italic">
                  Vault 01 // Main Hall
                </p>
              </div>
            </div>

            <p className="text-stone-500 text-xl font-light leading-relaxed max-w-2xl">
              By utilizing decentralized storage and high-resolution imaging, we
              ensure that even if a physical library is lost, its contents
              remain accessible to humanity. Every scan we perform is a vote for
              the future of human intellect.
            </p>
          </div>
        </div>
      </section>

      {/* --- 4. VALUES GRID --- */}
      <section className="max-w-400 mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <div
              key={i}
              className="p-12 rounded-4xl bg-white border border-stone-100 hover:border-amber-200 transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 mb-8">
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <h4 className="text-2xl font-serif italic mb-4 text-[#2C1B18]">
                {item.title}
              </h4>
              <p className="text-stone-400 font-light leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. CALL TO ACTION FOOTER --- */}
      <section className="max-w-400 mx-auto px-6 py-20">
        <div className="border-t border-stone-200 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-mono text-stone-300 uppercase tracking-[0.3em] mb-2">
              Nexus Archive © 2026
            </p>
            <p className="text-xs text-stone-400 uppercase tracking-widest">
              Designed for the preservation of human thought.
            </p>
          </div>

          <button className="group flex items-center gap-4 bg-[#2C1B18] text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-900 transition-all shadow-xl shadow-stone-900/10">
            Join the Collective
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Aboutus;
