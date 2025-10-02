import { useState, useEffect } from "react";

export default function useBlinkAnimation(frames, interval = 10000, frameDuration = 300) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const blink = () => {
      let i = 0;
      const blinkInterval = setInterval(() => {
        i++;
        if (i >= frames.length) {
          clearInterval(blinkInterval);
          setCurrentFrame(0);
        } else {
          setCurrentFrame(i);
        }
      }, frameDuration);
    };

    const blinkTimeout = setInterval(blink, interval);

    return () => clearInterval(blinkTimeout);
  }, [frames, interval, frameDuration]);

  return currentFrame;
}
