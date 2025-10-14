import { useState, useEffect } from "react";
import { chestFrames } from "@/app/assets/ChestFrames";

/**
 * Hook som hanterar kistans öppningsanimation.
 * Returnerar aktuell bildruta baserat på openChest-state.
 */ 
export default function useOpenChest(openChest) {
  const [chestImageFrame, setChestImageFrame] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);
  useEffect(() => {
    if (!openChest || !chestFrames?.length) return;

    let num = 0;
    const interval = setInterval(() => {
      if (num < chestFrames.length) {
        setChestImageFrame(chestFrames[num]);
        num++;
      } else {
        clearInterval(interval);
        setAnimationDone(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [openChest]);

  return {chestImageFrame, animationDone};
}
