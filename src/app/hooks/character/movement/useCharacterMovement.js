import { useState, useEffect, useRef } from "react";
import { emitEvent } from "@/app/utils/eventbus";

/**
 * useCharacterMovement – Hook som hanterar karaktärens rörelse och fysik.
 *
 * @param {number} initialLeft - Startposition horisontellt (px).
 * @param {number} initialBottom - Startposition vertikalt (px).
 *
 * Returnerar:
 * - left: karaktärens aktuella horisontella position (px)
 * - bottom: karaktärens aktuella vertikala position (px)
 * - keysPressed: objekt med status på tangenttryck { key: boolean }
 *
 * Funktionalitet:
 * - Lyssnar på tangenttryck (W/ArrowUp/Space för hopp, A/ArrowLeft för vänster, D/ArrowRight för höger).
 * - Hanterar horisontell rörelse med begränsningar till viewportens bredd.
 * - Hanterar vertikal rörelse med enkel fysik: jumpStrength och gravity.
 * - Trigger custom events för animation hooks:
 *   - "jump-start" när karaktären hoppar
 *   - "jump-stop" när karaktären landar
 *   - "walking-start" och "walking-stop" när karaktären går
 * - Använder requestAnimationFrame för kontinuerlig uppdatering av positioner.
 *
 * Användning:
 * const { left, bottom, keysPressed } = useCharacterMovement(100, 50);
 * <div style={{ left: `${left}px`, bottom: `${bottom}px` }}>Character</div>
 */
export default function useCharacterMovement(
  initialLeft = 0,
  initialBottom = 0
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
      // Hoppa
      if ((event.key === "w" || event.key === "ArrowUp" || event.key === " ") && bottom === initialBottom) {
        setVelocityY(jumpStrength);
        emitEvent("jump-start");
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

          if (velocityY !== 0) {
            emitEvent("jump-stop");
          }

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
