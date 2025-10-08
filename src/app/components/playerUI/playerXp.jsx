/**
 * PlayerXp – visar spelarens erfarenhetspoäng (XP) i form av en progressbar.
 *
 * @param {number} xp - Spelarens nuvarande XP (standardvärde: 50)
 *
 * Komponentens uppgift är att:
 * - Beräkna spelarens aktuella nivå baserat på definierade nivågränser.
 * - Visa en visuell XP-bar som fylls proportionerligt mot nästa nivå.
 * - Visa text med aktuell XP och XP-kravet för nästa nivå.
 */
export default function PlayerXp({ xp = 50 }) {
  // Definierade nivågränser — varje värde representerar XP som krävs för att nå nästa nivå
  const levels = [100, 200, 250, 400];
  const levelXp = [100, 200, 250, 400]; // Separat array för enkel åtkomst till XP per nivå

  // Hitta aktuell nivå (första nivån vars XP-krav är högre än spelarens XP)
  let currentLevel = levels.findIndex((lvlXp) => xp < lvlXp);

  // Om spelaren har mer XP än sista nivån → maxnivå
  if (currentLevel === -1) currentLevel = levels.length;

  // Beräkna hur stor andel av XP-baren som ska fyllas (max 100 %)
  const fillPercent = Math.min((xp / levelXp[currentLevel]) * 100, 100);

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
      <div className="flex flex-nowrap w-25">
        <span className="flex">
          {xp} / {levelXp[currentLevel]} XP
        </span>
      </div>
    </div>
  );
}
