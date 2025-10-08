"use client"

import { useEffect } from "react"
import { emitEvent } from "../utils/eventbus"
import ChangeSide from "../hooks/animations/changeSide"
import Character from "../components/scen/character"
import Floor from "../components/scen/house/floor"
import Door from "../components/scen/house/door"
import PickupBook from "../components/book/bookPickup"

export default function Aboutme(){
    useEffect(()=>{
        emitEvent("OpenAnimation");
    }, [])
    return <section className="relative overflow-hidden w-full h-screen">
    <ChangeSide/>
    <Character/>
    <Floor img="/pixelart/assets/house/floors/wood.jpg"/>
    <Door img="/pixelart/assets/house/doors/wood.png" destination="/projects"/>
    <Door img="/pixelart/assets/house/doors/wood.png" exit={true} destination="/"/>
    <PickupBook/>
    </section>
}