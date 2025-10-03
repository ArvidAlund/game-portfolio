import useCharacterMovement from "@/app/hooks/character/movement/useCharacterMovement";
import useBlinkAnimation from "@/app/hooks/character/animation/useBlinkAnimation";
import useWalkAnimation from "@/app/hooks/character/animation/useWalkAnimation";
import useJumpAnimation from "@/app/hooks/character/animation/useJumpAnimation";
import Message from "./characterMessages";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap/gsap-core";
import { AllFrames } from "@/app/hooks/character/animation/allFrames";



export default function Character() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { left, bottom } = useCharacterMovement(windowWidth / 2);
  const currentFrameBlink = useBlinkAnimation(AllFrames["blinkFrames"]);
  const currentFrameWalk = useWalkAnimation(AllFrames["walkFrames"]);
  const currentFrameJump = useJumpAnimation(AllFrames["jumpFrames"]);
  const messageRef = useRef(null);
  const [talking, setTalking] = useState(false);

  function getCurrentFrameSrc() {
    if (currentFrameJump !== null) return AllFrames["jumpFrames"][currentFrameJump];
    if (currentFrameWalk !== null) return AllFrames["walkFrames"][currentFrameWalk];
    if (currentFrameBlink !== null) return AllFrames["blinkFrames"][currentFrameBlink];
    return AllFrames["default"];
  }


  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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
      className="absolute mb-[-8px] scale-400 select-none Player"
      style={{ left: `${left}px`, bottom:`${bottom}px` }}
      onClick={handlePlayerClick}
    >
      <div className="relative w-full h-full">
        <img
        src={getCurrentFrameSrc()}
        alt="Character"
        className="origin-bottom pixelated"
      />
        <p className="absolute bottom-full w-[130%] text-[0.2rem] text-center text-black bg-[#f7efd8] rounded-lg p-1 hidden message opacity-0" ref={messageRef}></p>
      </div>
    </div>
  );
}

