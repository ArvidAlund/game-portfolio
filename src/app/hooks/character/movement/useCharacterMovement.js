import { useState, useEffect, useRef } from "react";
import { emitEvent } from "@/app/utils/eventbus";

export default function useCharacterMovement(
  initialLeft = 0,
  initialBottom = 1/6 * window.innerHeight
) {
  const [left, setLeft] = useState(initialLeft);
  const [bottom, setBottom] = useState(initialBottom);
  const [velocityY, setVelocityY] = useState(0);
  const [keysPressed, setKeysPressed] = useState({});
  const requestRef = useRef();

  const gravity = 0.5;
  const jumpStrength = 12;
  const moveSpeed = 4;

  // Tangenttryck
  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed(prev => ({ ...prev, [event.key]: true }));
      // hoppa
      if ((event.key === "w" || event.key === "ArrowUp" || event.key === " ") && bottom === initialBottom) {
        setVelocityY(jumpStrength);
      }
    };

    const handleKeyUp = (event) => {
      setKeysPressed(prev => ({ ...prev, [event.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [bottom]);

  // Animation frame loop
  useEffect(() => {
    const animate = () => {
      const movingLeft = keysPressed["a"] || keysPressed["ArrowLeft"];
      const movingRight = keysPressed["d"] || keysPressed["ArrowRight"];
      const isWalking = movingLeft || movingRight;

      // Skicka start/stop walking-event
      if (isWalking) {
        emitEvent("walking-start");
      } else {
        emitEvent("walking-stop");
      }

      // Horisontell rörelse
      if (movingLeft) setLeft(prev => Math.max(prev - moveSpeed, 20));
      if (movingRight) setLeft(prev => Math.min(prev + moveSpeed, window.innerWidth - 45));

      // Vertikal rörelse (jump / gravitation)
      setBottom(prev => {
        let newBottom = prev + velocityY;
        let newVelocityY = velocityY - gravity;

        if (newBottom <= initialBottom) {
          newBottom = initialBottom;
          newVelocityY = 0;
        }

        setVelocityY(newVelocityY);
        return newBottom;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [keysPressed, velocityY]);

  return { left, bottom, keysPressed };
}
