import { useState, useEffect } from "react";

export default function useCharacterMovement(initialLeft = 0) {
  const [left, setLeft] = useState(initialLeft);
  const [keysPressed, setKeysPressed] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed(prev => ({ ...prev, [event.key]: true }));
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
  }, []);

  useEffect(() => {
    const moveSpeed = 8;

    const move = () => {
        if (keysPressed["a"] || keysPressed["ArrowLeft"]) {
            setLeft(prev => Math.max(prev - moveSpeed, 0));
        }
        if (keysPressed["d"] || keysPressed["ArrowRight"]) {
            setLeft(prev => Math.min(prev + moveSpeed, window.innerWidth - 75));
        }
    };

    move();
  }, [keysPressed]);

  return { left, keysPressed };
}
