import isOverlapping from "@/app/lib/isOverlapping";
import { useRef, useEffect, useState } from "react";
import useOpenChest from "./animation/useOpenChest";

export default function RenderChest({ img = "pixelart/assets/misc/Chest.png" }) {
  const chestRef = useRef(null);
  const [openChest, setOpenChest] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);

  // 🪄 Hooken returnerar rätt frame baserat på openChest
  const {chestImage, chestOpen:open } = useOpenChest(openChest, chestOpen);

  useEffect(() => {
    const checkOverlap = () => {
      const player = document.querySelector(".Player");
      if (chestRef.current && player) {
        setOpenChest(isOverlapping(chestRef.current, player));
      }
    };

    const interval = setInterval(checkOverlap, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    if (open){
        setChestOpen(true);
    }
  },[open])

  return (
    <div className="w-25" ref={chestRef}>
      <img
        src={chestImage || img}
        alt="chest"
        className="pixelated h-full w-full object-contain"
      />
    </div>
  );
}
