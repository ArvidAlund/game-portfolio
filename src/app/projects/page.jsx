"use client"

import { useEffect, useState } from "react"
import { emitEvent } from "../utils/eventbus"
import ChangeSide from "../hooks/animations/changeSide"
import ProjectChests from "../components/scen/projectChests/projectChests"
import Character from "../components/scen/character"
import Floor from "../components/scen/house/floor"

export default function Projekt(){
    const [isReady, setIsReady] = useState(false);
    useEffect(()=>{
        emitEvent("OpenAnimation");
        setIsReady(true);
    }, [])
    return <main className="relative overflow-hidden w-full h-screen">
        {isReady ? (
            <>
                <Floor img="/pixelart/assets/ground/dirt.png" tileWidth={16}/>
                <Character/>
                <ProjectChests/>
            </>
        ): (null)}
        <ChangeSide/>
    </main>
}