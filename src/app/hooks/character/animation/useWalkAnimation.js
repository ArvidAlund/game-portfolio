import { useState, useEffect, useRef } from "react";
import { onEvent } from "@/app/utils/eventbus";

export default function useWalkAnimation(frames, frameDuration = 300) {
  const [currentFrame, setCurrentFrame] = useState(null);
  const walkingRef = useRef(false); // håller reda på om vi går
  const intervalRef = useRef(null);

  useEffect(() => {
    // startar walking
    const startWalking = () => {
      walkingRef.current = true;

      if (intervalRef.current) return; // om interval redan körs, gör inget

      let i = 0;
      intervalRef.current = setInterval(() => {
        setCurrentFrame(i);
        i = (i + 1) % frames.length; // loopar över frames
      }, frameDuration);
    };

    // stoppar walking
    const stopWalking = () => {
      walkingRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCurrentFrame(null); // återställ till default frame
      }
    };

    // Event-lyssnare
    const unsubscribeStart = onEvent("walking-start", startWalking);
    const unsubscribeStop = onEvent("walking-stop", stopWalking);

    return () => {
      clearInterval(intervalRef.current);
      unsubscribeStart();
      unsubscribeStop();
    };
  }, [frames, frameDuration]);

  return currentFrame;
}
