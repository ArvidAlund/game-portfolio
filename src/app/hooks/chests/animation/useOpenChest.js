import { useState, useEffect } from "react";
import { chestFrames } from "@/app/assets/ChestFrames";

/**
 * Manage the chest-opening animation and expose the current frame and completion state.
 * @param {boolean} openChest - When true, starts the frame-by-frame opening animation; when false no animation runs.
 * @returns {{chestImageFrame: (string|null), animationDone: boolean}} An object with the current image frame to display (`null` if none) and `animationDone` which is `true` when the animation has finished, `false` otherwise.
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