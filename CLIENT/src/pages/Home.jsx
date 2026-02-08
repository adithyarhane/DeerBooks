import React, { useEffect } from "react";
import Hero from "../components/layouts/home/Hero";
import BooksForEveryone from "../components/layouts/home/BooksForEveryone";
import NewArrivals from "../components/layouts/home/NewArrivals";
import PopularGenres from "../components/layouts/home/PopularGenres";
import NewsLetter from "../components/layouts/home/NewsLetter";
import BestSellers from "../components/layouts/home/BestSellers";

const Home = () => {
  useEffect(() => {
    document.title = "DeerBooks";
  }, []);

  return (
    <>
      <Hero />
      <BooksForEveryone />
      <BestSellers />
      <NewArrivals />
      <PopularGenres />
      <NewsLetter />
    </>
  );
};

export default Home;
