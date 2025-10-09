import { useState, useEffect } from "react";
import { chestFrames } from "@/app/assets/ChestFrames";

/**
 * Hook som hanterar kistans öppningsanimation.
 * Returnerar aktuell bildruta baserat på openChest-state.
 */
export default function useOpenChest(openChest, open) {
  const [chestImage, setChestImage] = useState(chestFrames?.[0] ?? null);
    const [chestOpen, setChestOpen] = useState(open);
  useEffect(() => {
    if (!openChest || !chestFrames?.length || chestOpen) return;

    let num = 0;
    const interval = setInterval(() => {
      if (num < chestFrames.length) {
        setChestImage(chestFrames[num]);
        num++;
      } else {
        clearInterval(interval);
        setChestOpen(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [openChest]);

  return {chestImage, chestOpen};
}
