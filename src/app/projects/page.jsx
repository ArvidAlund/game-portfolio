"use client"

import { useEffect } from "react"
import { emitEvent } from "../utils/eventbus"
import ChangeSide from "../hooks/animations/changeSide"
import Character from "../components/scen/character"

export default function Projekt(){
    useEffect(()=>{
        emitEvent("OpenAnimation");
    }, [])
    return <section className="relative overflow-hidden w-full h-screen">
    <ChangeSide/>
    <Character/>
    </section>
}