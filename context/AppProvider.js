/** @format */

"use client"; // Required for Next.js 15+ client components

import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [session, setSession] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  useEffect(() => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("amritPortfolioSession")
      );
      if (storedUser) {
        setSession(true);
      }
      setIsLoadingSession(false);
    } catch {
      setIsLoadingSession(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        isLoadingSession,
        setIsLoadingSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
