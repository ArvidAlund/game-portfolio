import { useState, useEffect } from "react";


const blinkFrames = [
    "/pixelart/character.png",
    "/pixelart/animate/Blink/step-1.png",
    "/pixelart/animate/Blink/step-2.png",
    "/pixelart/animate/Blink/step-1.png",
]
export default function Character() {
  const [keysPressed, setKeysPressed] = useState({});
  const [left, setLeft] = useState(0);
  const [currentFrameBlink, setCurrentFrameBlink] = useState(0);

  useEffect(() => {
    const blink = () => {
      let i = 0;
      const blinkInterval = setInterval(() => {
        i++;
        if (i >= blinkFrames.length) {
          clearInterval(blinkInterval);
          setCurrentFrameBlink(0); // återgå till stående frame
        } else {
            setCurrentFrameBlink(i);
        }
      }, 300); // varje frame visas i 400ms
    };

    const blinkTimeout = setInterval(blink, 10000); // blinka var 10:e sekund

    setLeft(window.innerWidth / 2);

    return () => clearInterval(blinkTimeout); // cleanup
  }, []);


  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: true }));

      if (event.key === "a" || event.key === "ArrowLeft") {
        setLeft((prev) => Math.max(prev - 10, 0)); // hindrar negativt värde
      }
      if (event.key === "d" || event.key === "ArrowRight") {
        setLeft((prev) => Math.min(prev + 10, window.innerWidth - 75)); 
        // hindrar att karaktären går utanför fönstret, 50 är bredd på karaktären
      }
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="absolute bottom-1/6 mb-[-8px] transition-all duration-100" style={{ left: `${left ? left : window.innerWidth / 2}px` }}>
      <img
        src={blinkFrames[currentFrameBlink]}
        alt="Character"
        className="scale-400 origin-bottom pixelated"
      />
    </div>
  );
}
