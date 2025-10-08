import { useState, useEffect, useRef } from "react";
import { onEvent } from "@/app/utils/eventbus";

/**
 * useWalkAnimation – Hook som hanterar karaktärens gång-animation.
 *
 * @param {Array} frames - Array med frames som ska visas under gång.
 * @param {number} frameDuration - Hur länge varje frame visas i ms (default 300ms).
 *
 * Returnerar:
 * - currentFrame: index på aktuell frame som ska visas, eller null om karaktären inte går.
 *
 * Funktionalitet:
 * - Lyssnar på custom events "walking-start" och "walking-stop" via eventbus.
 * - När "walking-start" triggas startar loop genom frames för gång-animation.
 * - När "walking-stop" triggas stoppas animationen och nuvarande frame återställs till default (null).
 * - Säkerställer att animation inte startas igen om interval redan körs.
 *
 * Användning:
 * const currentFrame = useWalkAnimation(AllFrames["walkFrames"]);
 * <img src={AllFrames["walkFrames"][currentFrame]} />
 */
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
