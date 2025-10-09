import { useState, useEffect, useRef } from "react";
import { onEvent, emitEvent } from "@/app/utils/eventbus";
import { useRouter } from "next/navigation";

/**
 * useEnterHouse – Hook för att hantera animation och scenövergång när spelaren går in i ett hus.
 *
 * @param {Array} frames - Array med frame-bilder för animationen under övergång.
 * @param {number} frameDuration - Hur länge varje frame visas i ms (default 500ms).
 * @param {string} targetUrl - URL som användaren navigeras till efter animation (default "/aboutme").
 *
 * Returnerar:
 * - currentFrame: index för den frame som ska visas just nu, eller null om ingen animation är aktiv.
 * - showTransition: boolean som indikerar om övergången till nästa sida pågår.
 *
 * Funktionalitet:
 * - Lyssnar på "EnterHouse"-event via eventbus.
 * - När eventet triggas startar frame-animationen och visar övergången.
 * - Efter angiven duration navigeras användaren till targetUrl via Next.js router.
 * - Trigger även "CloseAnimation" event under övergång för att hantera andra UI-animationer.
 *
 * Användning:
 * const { currentFrame, showTransition } = useEnterHouse(AllFrames["houseFrames"]);
 * <img src={AllFrames["houseFrames"][currentFrame]} />
 */
export default function useEnterHouse(frames, frameDuration = 250, targetUrl = "/aboutme") {
  const [currentFrame, setCurrentFrame] = useState(null);
  const intervalRef = useRef(null);
  const [showTransition, setShowTransition] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const EnterHouse = () => {
      // Start frame-animationen
      let i = 0;
      intervalRef.current = setInterval(() => {
        setCurrentFrame(i);
        i = (i + 1) % frames.length;
      }, frameDuration);

      // Aktivera övergångsskärm
      setShowTransition(true);

      // När animationen är klar, rensa interval och navigera
      setTimeout(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCurrentFrame(null);
        router.push(targetUrl);
      }, frameDuration); // duration per frame, kan justeras
    };

    // Lyssna på EnterHouse-event
    const unsubscribeStart = onEvent("EnterHouse", EnterHouse);

    // Cleanup
    return () => {
      clearInterval(intervalRef.current);
      unsubscribeStart();
    };
  }, [frames, frameDuration, router, targetUrl]);

  // Trigga CloseAnimation under övergång för att animera UI
  if (showTransition) {
    emitEvent("CloseAnimation");
  }

  return { currentFrame, showTransition };
}
