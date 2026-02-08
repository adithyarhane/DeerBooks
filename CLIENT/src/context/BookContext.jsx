/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const BookContext = createContext();
const LIMIT = 14;

export const BookContextProvider = ({ children }) => {
  const [archieve, setArchieve] = useState([]);
  const [book, setBook] = useState();
  const [relatedBooks, setRelatedBooks] = useState();
  const [booksForEveryone, setBooksForEveryone] = useState();
  const [bestSellers, setBestSellers] = useState();
  const [newReleases, setNewReleases] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooksData = async (page, category, searchQuery) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/archieve`,
        {
          page,
          limit: LIMIT,
          category,
          search: searchQuery,
        },
      );
      if (res.data.success) {
        setArchieve(res.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedBooks = async (slug) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/related-books/${slug}`,
      );
      if (res.data.success) {
        setRelatedBooks(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBook = async (slug, wishlistBooks, setIsLiked) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/get-book/${slug}`,
      );
      if (res.data.success) {
        setBook(res.data.data);
        fetchRelatedBooks(slug);
        if (wishlistBooks) {
          const existInWishlist = wishlistBooks.filter(
            (wbook) => wbook.book._id === res.data.data._id,
          );
          if (existInWishlist.length === 1) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getBooksForEveryone = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/books-for-everyone`,
        { limit: LIMIT },
      );
      if (res.data.success) {
        setBooksForEveryone(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getBestsellers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/bestsellers`,
        {
          limit: LIMIT,
        },
      );
      if (res.data.success) {
        setBestSellers(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getNewReleases = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deerbooks/book/new-releases`,
        {
          limit: LIMIT,
        },
      );

      if (res.data.success) {
        setNewReleases(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooksForEveryone();
    getBestsellers();
    getNewReleases();
  }, []);

  const value = {
    isLoading,
    booksForEveryone,
    bestSellers,
    newReleases,
    archieve,
    fetchBooksData,
    fetchBook,
    book,
    relatedBooks,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  return context;
};
