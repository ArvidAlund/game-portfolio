"use client"

import { useEffect, useState } from "react"
import { emitEvent } from "../utils/eventbus"
import ChangeSide from "../hooks/animations/changeSide"
import ProjectChests from "../components/scen/projectChests/projectChests"
import Character from "../components/scen/character"
import Floor from "../components/scen/house/floor"
import Background from "../components/scen/background"

export default function Projekt(){
    const [isReady, setIsReady] = useState(false);
    useEffect(()=>{
        emitEvent("OpenAnimation");
        setIsReady(true);
    }, [])
    return <main className="relative overflow-hidden w-full h-screen">
        {isReady ? (
            <>
                <Background/>
                <Floor img="/pixelart/assets/ground/dirt.png" tileWidth={16}/>
                <Character/>
                <ProjectChests/>
            </>
        ): (null)}
        <ChangeSide/>
    </main>
}