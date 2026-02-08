import React from "react";
import {
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiMapPin,
  FiAward,
} from "react-icons/fi";
import { RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";
import { footerNavlinks } from "../../assets/uidata";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A0F0B] pt-24 pb-12 text-stone-400 font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Column 1: The Seal */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-1">
                <img
                  className="w-8"
                  src="https://res.cloudinary.com/df7nkydkq/image/upload/v1769506491/Gemini_Generated_Image_sl8lypsl8lypsl8l-removebg-preview_w2f8tp.png"
                  alt="logo"
                />
              </div>
              <h3 className="text-2xl font-serif text-white tracking-widest uppercase">
                Deer <span className="italic font-light opacity-50">Books</span>
              </h3>
            </div>

            <p className="text-lg leading-relaxed max-w-sm font-light">
              Stewards of the printed word since 2012. We curate, bind, and
              preserve the world's most significant manuscripts for the modern
              collector.
            </p>

            <div className="flex gap-5">
              {[FiInstagram, FiTwitter, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#1A0F0B] transition-all duration-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Index */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                The Archive
              </h4>
              <ul className="space-y-4 text-sm font-medium italic">
                {footerNavlinks.slice(0, 4).map((item) => (
                  <li key={item.name}>
                    <Link
                      onClick={() => scrollTo(0, 0)}
                      to={`/${item.path}`}
                      className="hover:text-amber-500 transition-colors"
                    >
                      / {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                Inquiries
              </h4>
              <ul className="space-y-4 text-sm font-medium italic">
                {footerNavlinks.slice(4, 8).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={`/${item.path}`}
                      onClick={() => scrollTo(0, 0)}
                      className="hover:text-amber-500 transition-colors"
                    >
                      / {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Global Presence */}
          <div className="lg:col-span-3 space-y-8 bg-white/5 p-8 rounded-4xl border border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <FiMapPin className="text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Global HQ
                </span>
              </div>
              <p className="text-sm font-serif italic">
                42 Bruton Place, Mayfair
                <br />
                London, W1J 6NP
                <br />
                United Kingdom
              </p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="space-y-2">
              <p className="text-[9px] uppercase tracking-widest opacity-40">
                Digital Status
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-white font-mono uppercase">
                  Vault Servers Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Quote / Philosophy */}
        <div className="py-12 border-y border-white/5 flex flex-col items-center text-center">
          <RiDoubleQuotesR className="text-amber-900/20 text-5xl mb-6" />
          <p className="text-2xl md:text-3xl font-serif italic text-stone-500 max-w-3xl leading-relaxed">
            "A room without books is like a body without a soul."
          </p>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-amber-700">
            Cicero
          </p>
        </div>

        {/* Bottom Section: Legal & Credits */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] uppercase tracking-widest">
              © {currentYear} Folio Society. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Stewardship
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/50 px-5 py-2 rounded-full border border-white/5">
            <FiGlobe className="text-amber-900" size={12} />
            <span className="text-[10px] font-mono uppercase tracking-widest">
              English (INT)
            </span>
          </div>
        </div>
      </div>

      {/* Aesthetic Border at the very bottom */}
      <div className="mt-12 h-1.5 w-full bg-linear-to-r from-amber-900 via-amber-500 to-amber-900 opacity-20" />
    </footer>
  );
};

export default Footer;
