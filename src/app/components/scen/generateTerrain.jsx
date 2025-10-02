import { useState, useEffect } from "react";
import Ground from "./ground";
import Mountains from "./generateMountains";
import Clouds from "./clounds";
import House from "./house";

export default function Terrain() {
  const [initialized, setInitialized] = useState(false);

  // state för att lagra “barnen” efter första render
  const [terrainElements, setTerrainElements] = useState(null);

  useEffect(() => {
    if (!initialized) {
      setTerrainElements(
        <>
          <Clouds amount={10} />
          <Mountains amount={15} />
          <Ground />
          <House/>
        </>
      );
      setInitialized(true);
    }
  }, [initialized]);

  return terrainElements;
}
