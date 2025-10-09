import { useRef, useState, useEffect } from "react";
import isOverlapping from "@/app/lib/isOverlapping";
import { emitEvent } from "@/app/utils/eventbus";

export default function Door({ img, exit = false, destination = "/" }) {
  const doorRef = useRef(null);
  const [nearPlayer, setNearPlayer] = useState(false);

  // Kontrollera om spelaren är nära dörren
  useEffect(() => {
    const checkOverlap = () => {
      const player = document.querySelector(".Player");
      if (doorRef.current && player) {
        setNearPlayer(isOverlapping(doorRef.current, player));
      }
    };

    const interval = setInterval(checkOverlap, 50); // 20 fps
    return () => clearInterval(interval);
  }, []);

  // Lyssna på Enter när spelaren är nära
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (nearPlayer && e.key === "Enter") {
        emitEvent("CloseAnimation");
        setTimeout(()=>{
          window.location.href = destination
        },500)
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nearPlayer, destination]);

  return (
    <div
      className={`absolute bottom-1/7 ${exit ? "exitDoor left-1/10" : "left-5/6 normalDoor"}`}
      style={{
        width: "130px",
        height: "200px",
      }}
      ref={doorRef}
    >
      <img src={img} alt="Door" className="w-full h-full pixelated object-cover" />
    </div>
  );
}
