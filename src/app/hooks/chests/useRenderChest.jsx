import isOverlapping from "@/app/lib/isOverlapping";
import { useRef, useEffect, useState } from "react";
import useOpenChest from "./animation/useOpenChest";
import { emitEvent } from "@/app/utils/eventbus";


export default function RenderChest({ img = "pixelart/assets/misc/Chest.png", index}) { 
  const chestRef = useRef(null);
  const [openChest, setOpenChest] = useState(false);
  const [chestImage, setChestImage] = useState(img);
  const [expandedBoolean, setExpandedBoolean] = useState(false);

  // Hooken returnerar rätt frame baserat på openChest
  const {chestImageFrame, animationDone} = useOpenChest(openChest);

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


  useEffect(() => {
  if (chestImageFrame) {
    setChestImage(chestImageFrame);
  }
}, [chestImageFrame]);

  useEffect(()=>{
    if (!animationDone || !chestRef.current) return
    
    emitEvent(`showProject-${index}`)

    const handleKeyPress = (event) =>{
      console.log("test")
      if (event.key === "Enter"){
        setExpandedBoolean((prev)=> {
          const newValue = !prev;
          console.log("Toggling Expanded: ", newValue);
          emitEvent(`Expanded`, newValue);
          return newValue
        })
      }
    }
    const element = chestRef.current

    element.focus();
    element.addEventListener("keydown", handleKeyPress);

    return () =>{
      element.removeEventListener("keydown", handleKeyPress);
    }
  },[animationDone, index])

  return (
    <div className={`w-25 outline-0`} ref={chestRef} tabIndex={0}>
      <img
        src={chestImage || img}
        alt="chest"
        className="pixelated h-full w-full object-contain"
      />
    </div>
  );
}
