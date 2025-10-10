"use client"

import { useEffect } from "react"
import { emitEvent } from "../utils/eventbus"
import ChangeSide from "../hooks/animations/changeSide"
import ProjectChests from "../components/scen/projectChests/projectChests"
import Character from "../components/scen/character"
import Floor from "../components/scen/house/floor"

export default function Projekt(){
    useEffect(()=>{
        emitEvent("OpenAnimation");
    }, [])
    return <main className="relative overflow-hidden w-full h-screen">
        <Floor img="/pixelart/assets/ground/dirt.png" tileWidth={16}/>
        <ChangeSide/>
        <ProjectChests/>
        <Character/>
    </main>
}