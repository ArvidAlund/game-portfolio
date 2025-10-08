import { useState, useEffect } from "react";
import Ground from "./ground";
import Mountains from "./generateMountains";
import Clouds from "./clounds";
import House from "./house";

/**
 * Terrain – wrapper-komponent som renderar alla bakgrunds- och
 * miljöelement i spelet.
 *
 * Komponentens syfte:
 * - Rendera terrängkomponenterna en gång vid första mount.
 * - Inkluderar moln, berg, mark och hus i rätt ordning.
 * - Förhindrar onödig rerender av tunga visuella element genom
 *   att spara JSX i state.
 */
export default function Terrain() {
  const [initialized, setInitialized] = useState(false);

  // State som lagrar JSX för terräng-elementen efter första render
  const [terrainElements, setTerrainElements] = useState(null);

  /**
   * Effekt som körs vid mount:
   * - Skapar terrain-elementen och sparar dem i state.
   * - Sätter initialized till true för att undvika upprepade renderingar.
   */
  useEffect(() => {
    if (!initialized) {
      setTerrainElements(
        <>
          <Clouds amount={10} />
          <Mountains amount={15} />
          <Ground />
          <House />
        </>
      );
      setInitialized(true);
    }
  }, [initialized]);

  // Returnerar det sparade terrain-elementet, eller null innan första render
  return terrainElements;
}
