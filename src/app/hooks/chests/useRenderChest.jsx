import isOverlapping from "@/app/lib/isOverlapping";
import { useRef, useEffect, useState } from "react";
import useOpenChest from "./animation/useOpenChest";
import { emitEvent } from "@/app/utils/eventbus";


/**
 * Render a chest image that opens when the player overlaps it, emits events on animation completion, and toggles an expanded state via Enter.
 *
 * Renders a focusable container with the current chest frame image, monitors overlap with the player to trigger the opening animation, emits `showProject-{index}` when the opening animation completes, and emits `Expanded` whenever the expanded state changes. The container listens for the Enter key to toggle expansion.
 *
 * @param {Object} props
 * @param {string} [props.img="pixelart/assets/misc/Chest.png"] - URL for the chest image to display; updated as the open-animation frame changes.
 * @param {number|string} props.index - Identifier used to name the `showProject-{index}` event emitted when the opening animation finishes.
 * @returns {JSX.Element} The focusable chest element containing the chest image.
 */
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
      if (event.key === "Enter"){
        setExpandedBoolean(prev => !prev)
      }
    }
    const element = chestRef.current

    element.focus();
    element.addEventListener("keydown", handleKeyPress);

    return () =>{
      element.removeEventListener("keydown", handleKeyPress);
    }
  },[animationDone, index])

  useEffect(()=>{
    emitEvent("Expanded", expandedBoolean);
  },[expandedBoolean])

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