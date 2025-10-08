"use client"

import { createContext, useContext, useState, useEffect } from "react";

/**
 * WindowContext – Context för att hålla reda på fönstrets storlek.
 * Gör det möjligt för komponenter att alltid få aktuell bredd och höjd utan att själva lägga eventlisteners.
 */
const WindowContext = createContext();

/**
 * WindowProvider – Context provider som mäter fönstrets storlek och uppdaterar värdet vid resize.
 *
 * @param {React.ReactNode} children - Barnkomponenter som får tillgång till windowSize via context.
 *
 * Exempel:
 * <WindowProvider>
 *   <MyComponent />
 * </WindowProvider>
 */
export function WindowProvider({ children }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setWindowSize({
      windowWidth: window.innerWidth,  // Nuvarande bredd
      windowHeight: window.innerHeight, // Nuvarande höjd
    });

    handleResize(); // Sätt initial storlek
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowContext.Provider value={windowSize}>
      {children}
    </WindowContext.Provider>
  );
}

/**
 * useWindow – Custom hook för att läsa av fönstrets storlek från WindowContext.
 *
 * Returnerar ett objekt:
 * {
 *   windowWidth: number,
 *   windowHeight: number
 * }
 *
 * Exempel:
 * const { windowWidth, windowHeight } = useWindow();
 */
export const useWindow = () => useContext(WindowContext);
