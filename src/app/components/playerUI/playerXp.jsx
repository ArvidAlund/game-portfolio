import { onEvent } from "@/app/utils/eventbus";
import { useEffect, useState } from "react";

export default function PlayerXp({ startXp = 0 }) {
  const [xp, setXp] = useState(startXp);

  // Definierade nivågränser
  const levelXp = [100, 200, 250, 400];

  // Beräkna aktuell nivå och XP mot den nivån
  let remainingXp = xp;
  let currentLevel = 0;

  while (currentLevel < levelXp.length && remainingXp >= levelXp[currentLevel]) {
    remainingXp -= levelXp[currentLevel];
    currentLevel++;
  }

  // Fyllnadsprocent för progressbar
  const fillPercent =
    currentLevel < levelXp.length
      ? Math.min((remainingXp / levelXp[currentLevel]) * 100, 100)
      : 100; // maxnivå

  useEffect(() => {
    const unsubscribe = onEvent("AddXp", (amount) => {
      setXp((prev) => prev + amount);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-1/3 flex p-2 items-center">
      {/* XP-barens bakgrund */}
      <div className="w-full h-4 bg-gray-300 rounded overflow-hidden mr-2">
        {/* Grön del visar progress mot nästa nivå */}
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${fillPercent}%` }}
        />
      </div>

      {/* Textvisning: nuvarande XP / XP till nästa nivå */}
      <div className="flex flex-nowrap w-30">
        <span className="flex flex-col text-xl">
          <p>lvl {currentLevel}</p>
          <p>{remainingXp} / {currentLevel < levelXp.length ? levelXp[currentLevel] : "MAX"} XP</p>
        </span>
      </div>
    </div>
  );
}
