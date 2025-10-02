import useCharacterMovement from "@/app/hooks/character/movement/useCharacterMovement";
import useBlinkAnimation from "@/app/hooks/character/animation/useBlinkAnimation";
import useWalkAnimation from "@/app/hooks/character/animation/useWalkAnimation";

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

  return (
    <div
      className="absolute mb-[-8px] scale-400 mainCharacter"
      style={{ left: `${left}px`, bottom:`${bottom}px` }}
    >
      <img
        src={blinkFrames[currentFrameBlink]}
        alt="Character"
        className="origin-bottom pixelated"
      />
    </div>
  );
}
