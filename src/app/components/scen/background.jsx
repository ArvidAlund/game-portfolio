"use client";

import { useWindow } from "@/global/WindowContext";

export default function Background({
  img = "pixelart/assets/background/stone.png",
  rows = 5,
  cols = 10,
}) {
  const { windowWidth, windowHeight } = useWindow();

  const tiles = [];
  for (let i = 0; i < rows * cols; i++) {
    tiles.push(
      <img
        key={i}
        src={img}
        alt="background tile"
        className="pixelated w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full h-5/6 overflow-hidden">
      <div
        className={`grid w-full h-full`}
        style={{
          gridTemplateColumns: `repeat(${cols}, ${windowWidth / cols}px)`,
          gridTemplateRows: `repeat(${rows}, ${windowHeight / rows}px)`,
        }}
      >
        {tiles}
      </div>
    </div>
  );
}
