"use client"
import { createContext, useContext, useState, useEffect } from "react";

const WindowContext = createContext();

export function WindowProvider({ children }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowContext.Provider value={windowSize}>
      {children}
    </WindowContext.Provider>
  );
}

export const useWindow = () => useContext(WindowContext);
