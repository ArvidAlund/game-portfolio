import useCharacterMovement from "@/app/hooks/character/useCharacterMovement";
import useBlinkAnimation from "@/app/hooks/character/useBlinkAnimation";

const blinkFrames = [
  "/pixelart/character.png",
  "/pixelart/animate/Blink/step-1.png",
  "/pixelart/animate/Blink/step-2.png",
  "/pixelart/animate/Blink/step-1.png",
];

export default function Character() {
  const { left } = useCharacterMovement(window.innerWidth / 2);
  const currentFrameBlink = useBlinkAnimation(blinkFrames);

  return (
    <div
      className="absolute bottom-1/6 mb-[-8px] transition-all duration-100"
      style={{ left: `${left}px` }}
    >
      <img
        src={blinkFrames[currentFrameBlink]}
        alt="Character"
        className="scale-400 origin-bottom pixelated"
      />
    </div>
  );
}
