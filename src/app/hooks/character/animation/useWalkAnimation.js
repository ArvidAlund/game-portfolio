import { useState, useEffect } from "react";

export default function useWalkAnimation(frames, interval = 10000, frameDuration = 300) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const walk = () => {
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

    const walkTimeout = setInterval(walk, interval);

    return () => clearInterval(walkTimeout);
  }, [frames, interval, frameDuration]);

  return currentFrame;
}
