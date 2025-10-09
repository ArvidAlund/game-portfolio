"use client"

import { useEffect } from "react"
import { emitEvent } from "../utils/eventbus"
import ChangeSide from "../hooks/animations/changeSide"
import Character from "../components/scen/character"
import ProjectChests from "../components/scen/projectChests/projectChests"

export default function Projekt(){
    useEffect(()=>{
        emitEvent("OpenAnimation");
    }, [])
    return <main className="relative overflow-hidden w-full h-screen">
    <ChangeSide/>
    <Character/>
    <ProjectChests/>
    </main>
}