import useCharacterMovement from "@/app/hooks/character/movement/useCharacterMovement";
import useBlinkAnimation from "@/app/hooks/character/animation/useBlinkAnimation";
import useWalkAnimation from "@/app/hooks/character/animation/useWalkAnimation";
import Message from "./characterMessages";
import { useRef, useState } from "react";
import { gsap } from "gsap/gsap-core";

const blinkFrames = [
  "/pixelart/character.png",
  "/pixelart/animate/Blink/step-1.png",
  "/pixelart/animate/Blink/step-2.png",
  "/pixelart/animate/Blink/step-1.png",
];

const walkFrames = [
    "/pixelart/character.png",
    "/pixelart/animate/Forward/step-1.png",
    "/pixelart/animate/Forward/step-2.png"
]

export default function Character() {
  const { left, bottom } = useCharacterMovement(window.innerWidth / 2);
  const currentFrameBlink = useBlinkAnimation(blinkFrames);
  const messageRef = useRef(null);
  const [talking, setTalking] = useState(false);

  const handlePlayerClick = () => {
  if (!talking && messageRef.current) {
    setTalking(true);

    // sätt text och visa
    messageRef.current.textContent = Message();
    messageRef.current.style.display = "block";

    // animera in
    gsap.fromTo(
      messageRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // stäng efter 3 sek
    const timeout = setTimeout(() => {
      if (messageRef.current) {
        gsap.to(messageRef.current, {
          y: 10,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            messageRef.current.textContent = "";
            messageRef.current.style.display = "none";
            setTalking(false);
          },
        });
      }
    }, 5000);

    // rensa om komponenten försvinner
    return () => clearTimeout(timeout);
  }
};


  return (
    <div
      className="absolute mb-[-8px] scale-400 Player"
      style={{ left: `${left}px`, bottom:`${bottom}px` }}
      onClick={handlePlayerClick}
    >
      <div className="relative w-full h-full">
        <img
        src={blinkFrames[currentFrameBlink]}
        alt="Character"
        className="origin-bottom pixelated"
      />
        <p className="absolute bottom-full w-[130%] text-[0.2rem] text-center text-black bg-[#f7efd8] rounded-lg p-1 hidden message opacity-0" ref={messageRef}></p>
      </div>
    </div>
  );
}
