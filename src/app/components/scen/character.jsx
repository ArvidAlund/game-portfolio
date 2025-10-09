import useCharacterMovement from "@/app/hooks/character/movement/useCharacterMovement";
import useBlinkAnimation from "@/app/hooks/character/animation/useBlinkAnimation";
import useWalkAnimation from "@/app/hooks/character/animation/useWalkAnimation";
import useJumpAnimation from "@/app/hooks/character/animation/useJumpAnimation";
import usePlayerMessage from "@/app/hooks/character/usePlayerMessages";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/gsap-core";
import { AllFrames } from "@/app/hooks/character/animation/allFrames";
import useEnterHouse from "@/app/hooks/character/animation/useEnterHouse";
import { useWindow } from "@/global/WindowContext";
import { onEvent } from "@/app/utils/eventbus";

/**
 * Character – huvudkomponenten för spelarens karaktär på skärmen.
 *
 * Hanterar:
 * - Spelarens position på skärmen via `useCharacterMovement`.
 * - Animationstillstånd (blinka, gå, hoppa, gå in i hus).
 * - Visning och animation av korta textmeddelanden vid klick.
 *
 * Komponentens visuella representation styrs via spriteframes som hämtas
 * från `AllFrames`, beroende på vilket tillstånd spelaren befinner sig i.
 */
export default function Character() {
  // Hämtar aktuell fönsterstorlek från global context (för korrekt positionering)
  const { windowWidth, windowHeight } = useWindow();

  // Returnerar spelarens position (vänster/botten) baserat på användarinmatning
  const { left, bottom } = useCharacterMovement(windowWidth / 2, (1 / 6) * windowHeight);

  // Hämtar rätt sprite-frame från respektive animationshook
  const currentFrameBlink = useBlinkAnimation(AllFrames["blinkFrames"]);
  const currentFrameWalk = useWalkAnimation(AllFrames["walkFrames"]);
  const currentFrameJump = useJumpAnimation(AllFrames["jumpFrames"]);
  const { currentFrameHouse, showTransition } = useEnterHouse(AllFrames["back"]);

  const messageRef = useRef(null); // Referens till textbubblan ovanför karaktären
  const [talking, setTalking] = useState(false); // Indikerar om karaktären pratar just nu

  const [canMove, setCanMove] = useState(true);
  /**
   * Returnerar rätt sprite-bild beroende på animationstillstånd.
   * Prioritering: transition (in i hus) > hopp > gång > blink > default.
   */
  function getCurrentFrameSrc() {
    if (!canMove){
      if (currentFrameBlink !== null) return AllFrames["blinkFrames"][currentFrameBlink];
      return AllFrames["default"];
    } 
    if (showTransition) return AllFrames["back"];
    if (currentFrameJump !== null) return AllFrames["jumpFrames"][currentFrameJump];
    if (currentFrameWalk !== null) return AllFrames["walkFrames"][currentFrameWalk];
    if (currentFrameBlink !== null) return AllFrames["blinkFrames"][currentFrameBlink];
    return AllFrames["default"];
  }

  useEffect(() => {
    const unsubscribe = onEvent("CanMove", (detail) => {
      setCanMove(detail);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Hanterar klick på karaktären – visar en tillfällig pratbubbla.
   * - Hämtar text via `Message()`
   * - Animerar in pratbubblan med GSAP
   * - Döljer och återställer den efter några sekunder
   */
  const handlePlayerClick = () => {
    if (!talking && messageRef.current) {
      setTalking(true);

      // Sätt text och visa pratbubblan
      messageRef.current.textContent = usePlayerMessage();
      messageRef.current.style.display = "block";

      // Fade + slide in
      gsap.fromTo(
        messageRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Döljer efter 5 sekunder
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

      // Säkerställer att timeout rensas om komponenten avmonteras
      return () => clearTimeout(timeout);
    }
  };

  return (
    <div
      className="absolute mb-[-8px] scale-400 select-none z-50 Player"
      style={{ left: `${left}px`, bottom: `${bottom}px` }}
      onClick={handlePlayerClick}
    >
      <div className="relative w-full h-full">
        {/* Karaktärssprite som byts ut baserat på animationstillstånd */}
        <img
          src={getCurrentFrameSrc()}
          alt="Character"
          className="origin-bottom pixelated"
        />

        {/* Pratbubbla – visas temporärt vid klick */}
        <p
          ref={messageRef}
          className="absolute bottom-full w-[130%] text-[0.3rem] text-center text-black bg-[#f7efd8] rounded-lg p-1 hidden message opacity-0"
        ></p>
      </div>
    </div>
  );
}
