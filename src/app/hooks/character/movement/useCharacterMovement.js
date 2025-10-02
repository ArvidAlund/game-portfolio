import { useState, useEffect, useRef } from "react";

export default function useCharacterMovement(initialLeft = 0, initialBottom = (1/6 * window.innerHeight)) {
  const [left, setLeft] = useState(initialLeft);
  const [bottom, setBottom] = useState(initialBottom);
  const [velocityY, setVelocityY] = useState(0); // börjar stilla
  const [keysPressed, setKeysPressed] = useState({});
  const requestRef = useRef();

  const gravity = 0.5;   // drar ner karaktären varje frame
  const jumpStrength = 12; // hur högt karaktären hoppar
  const moveSpeed = 5; // hur snabbt karaktären går

  // Tangenttryck
  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed(prev => ({ ...prev, [event.key]: true }));
      // sätt velocityY när man trycker på hopp
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
      // Horisontell rörelse
      if (keysPressed["a"] || keysPressed["ArrowLeft"]) {
        setLeft(prev => Math.max(prev - moveSpeed, 20));
      }
      if (keysPressed["d"] || keysPressed["ArrowRight"]) {
        setLeft(prev => Math.min(prev + moveSpeed, window.innerWidth - 45));
      }

      // Vertikal rörelse (jump / gravitation)
      setBottom(prev => {
        let newBottom = prev + velocityY;
        let newVelocityY = velocityY - gravity;

        // om vi når marken
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
