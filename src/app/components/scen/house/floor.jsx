"use client"
import { useEffect, useState } from "react";
import { useWindow } from "@/global/WindowContext";

export default function Floor({ img, rotate=false, tileWidth=64 }) {
  const [tiles, setTiles] = useState(0);
  const {windowWidth, windowHeight} = useWindow();

  useEffect(() => {

    const updateTiles = () => {
      const screenWidth = windowWidth;
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
          className={`h-full w-auto pixelated ${rotate ? "rotate-90": null}`}
          draggable="false"
        />
      ))}
    </div>
  );
}
