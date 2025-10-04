"use client"
import { useEffect, useState } from "react";
import { useWindow } from "@/global/WindowContext";

export default function Floor({ img }) {
  const [tiles, setTiles] = useState(0);
  const {windowWidth, windowHeight} = useWindow();

  useEffect(() => {

    const updateTiles = () => {
      const screenWidth = windowWidth;
      const tileWidth = 64; // pixelbredd på din tile
      setTiles(Math.ceil(screenWidth / tileWidth));
    };

    updateTiles(); // kör direkt vid mount
    window.addEventListener("resize", updateTiles);
    return () => window.removeEventListener("resize", updateTiles);
  }, []);

  return (
    <div className="w-full h-1/6 fixed bottom-0 flex overflow-hidden">
      {Array.from({ length: tiles }).map((_, i) => (
        <img
          key={i}
          src={img}
          className="h-full w-auto pixelated rotate-90"
          draggable="false"
        />
      ))}
    </div>
  );
}
