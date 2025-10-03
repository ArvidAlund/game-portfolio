import { useState, useEffect } from "react";

export default function useBlinkAnimation(frames, interval = 10000, frameDuration = 200) {
  const [currentFrame, setCurrentFrame] = useState(null);

  useEffect(() => {
    const blink = () => {
      frames.forEach((_, index) => {
        setTimeout(() => {
          setCurrentFrame(index);
        }, index * frameDuration);
      });

      // Nollställ efter sista framen
      setTimeout(() => {
        setCurrentFrame(null);
      }, frames.length * frameDuration);
    };

    blink(); // Kör direkt första gången
    const blinkInterval = setInterval(blink, interval);

    return () => clearInterval(blinkInterval);
  }, [frames, interval, frameDuration]);

  return currentFrame;
}
