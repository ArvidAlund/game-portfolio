import { useState, useEffect } from "react";
import { chestFrames } from "@/app/assets/ChestFrames";

/**
 * Hook som hanterar kistans öppningsanimation.
 * Returnerar aktuell bildruta baserat på openChest-state.
 */ 
export default function useOpenChest(openChest, open) {
  const [chestImageFrame, setChestImageFrame] = useState(null);
  useEffect(() => {
    if (!openChest || !chestFrames?.length || open) return;

    let num = 0;
    const interval = setInterval(() => {
      if (num < chestFrames.length) {
        setChestImageFrame(chestFrames[num]);
        num++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [openChest]);

  return {chestImageFrame, open};
}
