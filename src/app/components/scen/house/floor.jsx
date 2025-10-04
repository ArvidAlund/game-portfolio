import { useEffect, useState } from "react";

export default function Floor({ img }) {
  const [tiles, setTiles] = useState(0);

  useEffect(() => {
    const updateTiles = () => {
      const screenWidth = window.innerWidth;
      const tileWidth = 64; // bredden på din golvbild i px (ändra till rätt värde)
      setTiles(Math.ceil(screenWidth / tileWidth));
    };

    updateTiles();
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
