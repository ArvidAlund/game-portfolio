import { useState, useEffect, useRef } from "react";
import { onEvent } from "@/app/utils/eventbus";

/**
 * useJumpAnimation – Hook som hanterar karaktärens hop-animation.
 *
 * @param {Array} frames - Array med frames som ska visas under hoppen.
 * @param {number} frameDuration - Hur länge varje frame visas i ms (default 50ms).
 *
 * Returnerar:
 * - currentFrame: index på aktuell frame som ska visas, eller null om ingen hop-animation pågår.
 *
 * Funktionalitet:
 * - Lyssnar på custom events "jump-start" och "jump-stop" via eventbus.
 * - När "jump-start" triggas startar loop genom frames för hop-animation.
 * - När "jump-stop" triggas stoppas animationen och nuvarande frame återställs till default (null).
 * - Säkerställer att animation inte startas igen om hop redan pågår.
 *
 * Användning:
 * const currentFrame = useJumpAnimation(AllFrames["jumpFrames"]);
 * <img src={AllFrames["jumpFrames"][currentFrame]} />
 */
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

    // Cleanup
    return () => {
      clearInterval(intervalRef.current);
      unsubscribeStart();
      unsubscribeStop();
    };
  }, [frames, frameDuration]);

  return currentFrame;
}
