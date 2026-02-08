/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UiContext = createContext();

export const UiContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [globalSearch, setGlobalSearch] = useState();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (globalSearch) {
      navigate(`/archieve?search=${globalSearch}`);
    }
  });

  const value = {
    isSearchOpen,
    setIsSearchOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    viewMode,
    setViewMode,
    globalSearch,
    setGlobalSearch,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUiContext = () => {
  const context = useContext(UiContext);
  return context;
};
