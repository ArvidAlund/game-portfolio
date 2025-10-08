import { useState, useEffect } from "react";

/**
 * useBlinkAnimation – Hook för att hantera blink-animation för en karaktär eller sprite.
 *
 * @param {Array} frames - Array med frame-källor (bilder) som används för blink-animation.
 * @param {number} interval - Tid mellan varje blink i millisekunder (default 10000ms = 10 sek).
 * @param {number} frameDuration - Hur länge varje frame visas under blink i millisekunder (default 200ms).
 *
 * Returnerar:
 * - currentFrame: index för den frame som ska visas just nu, eller null om ingen blink är aktiv.
 *
 * Exempel:
 * const currentFrame = useBlinkAnimation(AllFrames["blinkFrames"]);
 * <img src={AllFrames["blinkFrames"][currentFrame]} />
 *
 * Noteringar:
 * - Hooken kör blink direkt första gången och sedan upprepas det med angivet intervall.
 * - När blink-animationen är klar återställs currentFrame till null.
 */
export default function useBlinkAnimation(frames, interval = 10000, frameDuration = 200) {
  const [currentFrame, setCurrentFrame] = useState(null);

  useEffect(() => {
    const blink = () => {
      // Loop genom frames för blink
      frames.forEach((_, index) => {
        setTimeout(() => {
          setCurrentFrame(index);
        }, index * frameDuration);
      });

      // Återställ till null efter sista frame
      setTimeout(() => {
        setCurrentFrame(null);
      }, frames.length * frameDuration);
    };

    blink(); // Kör första blink direkt
    const blinkInterval = setInterval(blink, interval);

    // Rensa interval när komponent avmonteras
    return () => clearInterval(blinkInterval);
  }, [frames, interval, frameDuration]);

  return currentFrame;
}
