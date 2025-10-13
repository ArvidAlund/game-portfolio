import isOverlapping from "@/app/lib/isOverlapping";
import { useRef, useEffect, useState } from "react";
import useOpenChest from "./animation/useOpenChest";

export default function RenderChest({ img = "pixelart/assets/misc/Chest.png", index}) { 
  const chestRef = useRef(null);
  const [openChest, setOpenChest] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [chestImage, setChestImage] = useState(img);

  // 🪄 Hooken returnerar rätt frame baserat på openChest
  const {chestImageFrame, open } = useOpenChest(openChest, chestOpen);

  useEffect(() => {
    const checkOverlap = () => {
      const player = document.querySelector(".Player");
      if (chestRef.current && player) {
        if (isOverlapping(chestRef.current, player)){
          setOpenChest(true);
        }
      }
    };

    const interval = setInterval(checkOverlap, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    if (open && !chestOpen){
        setChestOpen(true);
    }
  },[open, chestOpen])


  useEffect(() => {
  if (chestImageFrame) {
    setChestImage(chestImageFrame);
  }
}, [chestImageFrame]);


  return (
    <div className={`w-25`} ref={chestRef}>
      <img
        src={chestImage || img}
        alt="chest"
        className="pixelated h-full w-full object-contain"
      />
    </div>
  );
}
