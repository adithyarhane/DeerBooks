import React, { useState } from "react";
import { FiArrowRight, FiBookOpen, FiCompass } from "react-icons/fi";
import { Link } from "react-router-dom";

const PopularGenres = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const genres = [
    {
      id: "01",
      name: "Philosophy",
      count: "1,240",
      image:
        "https://i.pinimg.com/736x/0c/73/a8/0c73a8bcd3a054c66e7a41ec7af61fb1.jpg",
      color: "bg-amber-900",
    },
    {
      id: "02",
      name: "Fiction",
      count: "3,820",
      image:
        "https://i.pinimg.com/736x/f9/c4/0c/f9c40cb337f773246c8fb4b9a1de471d.jpg",
      color: "bg-stone-900",
    },
    {
      id: "03",
      name: "History",
      count: "940",
      image:
        "https://i.pinimg.com/1200x/ae/35/86/ae35867ab39afc70c4f39b11a8575b0a.jpg",
      color: "bg-orange-950",
    },
    {
      id: "04",
      name: "Poetry",
      count: "610",
      image:
        "https://i.pinimg.com/736x/7b/46/08/7b4608b5aec111264018eeee4a161d41.jpg",
      color: "bg-yellow-950",
    },
    {
      id: "05",
      name: "Science",
      count: "1,100",
      image:
        "https://i.pinimg.com/736x/e3/71/f7/e371f7bfa3345af41adde9cc5c145d1c.jpg",
      color: "bg-[#1A0F0B]",
    },
  ];

  return (
    <section className="py-6 bg-[#FCF9F2]">
      {/* Updated width to 1600px */}
      <div className="max-w-400 mx-auto px-6">
        {/* Header: Refined to match Matrix/NewArrivals style */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16 border-b border-[#3E2723]/10 pb-12">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-700">
              <FiCompass size={22} />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#2C1B18] tracking-tighter leading-none">
              Popular{" "}
              <span className="italic font-light text-amber-900/40">
                Genres.
              </span>
            </h2>
          </div>
          <p className="text-[#A1887F] font-sans text-[10px] uppercase tracking-[0.4em] font-black md:ml-auto mb-2">
            Explore the depth of our collection
          </p>
        </div>

        {/* Dynamic Accordion Grid */}
        <div className="flex flex-col md:flex-row h-150 gap-5">
          {genres.map((genre, index) => (
            <Link
              key={genre.id}
              to={`/archieve?category=${genre.name.toLowerCase()}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => window.scrollTo(0, 0)}
              className={`group relative overflow-hidden rounded-[3rem] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                hoveredIndex === index ? "flex-[3.5]" : "flex-1"
              } ${genre.color}`}
            >
              {/* Background Image */}
              <img
                src={genre.image}
                alt={genre.name}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  hoveredIndex === index
                    ? "scale-105 opacity-60"
                    : "scale-110 opacity-30 grayscale"
                }`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />

              {/* Vertical Label (Visible when NOT hovered) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
                  hoveredIndex === index ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="text-white/40 font-serif text-3xl rotate-0 lg:-rotate-90 whitespace-nowrap tracking-tighter uppercase transition-transform group-hover:scale-110">
                  {genre.name}
                </span>
              </div>

              {/* Expanded Content (Visible on Hover) */}
              <div
                className={`absolute inset-0 p-10 flex flex-col justify-end transition-all duration-500 ${
                  hoveredIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-amber-500 font-mono text-xs font-bold tracking-widest">
                    CODE_{genre.id}
                  </span>
                  <div className="w-12 h-px bg-amber-500/50" />
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                    {genre.count} Editions
                  </span>
                </div>

                <h3 className="text-5xl md:text-6xl text-white font-serif mb-8 tracking-tighter">
                  {genre.name}
                </h3>

                <div className="flex items-center gap-4 text-white text-[11px] font-black uppercase tracking-[0.2em]">
                  <span className="group-hover:text-amber-500 transition-colors">
                    Access Vault
                  </span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <FiArrowRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 text-center border-t border-[#3E2723]/5 pt-10">
          <button className="group flex items-center gap-4 mx-auto text-[#2C1B18] font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:tracking-[0.5em]">
            <FiBookOpen size={18} className="text-amber-600" />
            <span className="border-b border-stone-300 group-hover:border-amber-600 transition-all">
              Request a New Category
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularGenres;
