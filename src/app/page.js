"use client"
import Ground from "./components/scen/ground"
import Character from "./components/scen/character"
import StartScreen from "./components/scen/startScreen"
import TipsContainer from "./components/scen/tipsContainer"
import { useState } from "react"

export default function Home() {
  const [menuClosed, setMenuClosed] = useState(false)

  // Rätt sätt att definiera funktionen
  const handleCloseStartScreen = () => {
    setMenuClosed(true)
  }

  return (
    <div className="bg-[rgb(1,173,255)] h-screen w-screen relative">
      <Ground/>
      <Character/>
      {!menuClosed ? <StartScreen onClose={handleCloseStartScreen} /> :<TipsContainer/>}
    </div>
  )
}
