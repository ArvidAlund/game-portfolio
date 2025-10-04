import { useState, useEffect, useRef } from "react";
import { onEvent, emitEvent } from "@/app/utils/eventbus";
import { useRouter } from "next/navigation";


export default function useEnterHouse(frames, frameDuration = 500, targetUrl = "/aboutme") {
  const [currentFrame, setCurrentFrame] = useState(null);
  const intervalRef = useRef(null);
  const [showTransition, setShowTransition] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const EnterHouse = () => {

      // Start frame animation
      let i = 0;
      intervalRef.current = setInterval(() => {
        setCurrentFrame(i);
        i = (i + 1) % frames.length;
      }, frameDuration);

      // Start screen transition efter 500ms (eller så lång som du vill)
      setShowTransition(true);

      // Byt sida när animationen är klar
      setTimeout(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCurrentFrame(null);
        router.push(targetUrl);
      }, frameDuration); // frame + cirkel-animation
    };

    const unsubscribeStart = onEvent("EnterHouse", EnterHouse);

    return () => {
      clearInterval(intervalRef.current);
      unsubscribeStart();
    };
  }, [frames, frameDuration, router, targetUrl]);

  if (showTransition){
    emitEvent("CloseAnimation")
  }
  return { currentFrame, showTransition };
}
