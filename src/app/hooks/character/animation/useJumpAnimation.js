import { useState, useEffect, useRef } from "react";
import { onEvent } from "@/app/utils/eventbus";

export default function useJumpAnimation(frames, frameDuration = 50) {
  const [currentFrame, setCurrentFrame] = useState(null);
  const jumpingRef = useRef(false); // håller reda på om vi hoppar
  const intervalRef = useRef(null);

  useEffect(() => {
    // startar hop-animation
    const startJump = () => {
      if (jumpingRef.current) return; // om redan hoppar, gör inget
      jumpingRef.current = true;

      let i = 0;
      intervalRef.current = setInterval(() => {
        setCurrentFrame(i);
        i = (i + 1) % frames.length; // loopar genom frames
      }, frameDuration);
    };

    // stoppar hop-animation
    const stopJump = () => {
      jumpingRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCurrentFrame(null); // återställ till default frame
      }
    };

    // Lyssna på jump-events
    const unsubscribeStart = onEvent("jump-start", startJump);
    const unsubscribeStop = onEvent("jump-stop", stopJump);

    return () => {
      clearInterval(intervalRef.current);
      unsubscribeStart();
      unsubscribeStop();
    };
  }, [frames, frameDuration]);

  return currentFrame;
}
