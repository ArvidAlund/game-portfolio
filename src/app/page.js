"use client"
import Character from "./components/scen/character"
import StartScreen from "./components/scen/startScreen"
import TipsContainer from "./components/scen/tipsContainer"
import Terrain from "./components/scen/generateTerrain"
import ChangeSide from "./hooks/animations/changeSide"
import { useState, useMemo, useEffect } from "react"
import PlayerUI from "./components/playerUI/playerUI"

export default function Home() {
  const [menuClosed, setMenuClosed] = useState(false)
  const [terrainReady, setTerrainReady] = useState(false)

  // Memoize Terrain så den bara genereras en gång
  const terrainJSX = useMemo(() => {
    return <Terrain />;
  }, []);

  // Simulera “loading” med useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTerrainReady(true)
    }, 1000) // t.ex. 1 sekund “laddning”
    
    return () => clearTimeout(timeout)
  }, [])

  const handleCloseStartScreen = () => {
    setMenuClosed(true)
  }

  return (
    <div className="bg-[rgb(1,173,255)] h-screen w-full relative overflow-hidden">
      {!terrainReady ? (
        <div className="flex justify-center items-center h-full text-white text-4xl">
          Loading...
        </div>
      ) : (
        <>
          {terrainJSX} {/* Terrain genereras en gång */}
          <Character />
          {!menuClosed ? <StartScreen onClose={handleCloseStartScreen}/> : <TipsContainer />}
          <ChangeSide/>
          <PlayerUI/>
        </>
      )}
    </div>
  )
}
