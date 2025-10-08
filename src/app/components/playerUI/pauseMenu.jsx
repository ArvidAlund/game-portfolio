"use client"

import { useEffect, useState } from "react";
import { emitEvent, onEvent } from "@/app/utils/eventbus";
import MenuButton from "../menuButton";

export default function PauseMenu(){
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onEvent("OpenPause", (detail) => {
          setIsVisible(detail);
        });
    
        return () => unsubscribe();
      }, []);
    return <section className={`absolute left-1/2 top-1/2 -translate-1/2 ${isVisible ? "w-full h-full flex" : "w-0 h-0 hidden"} backdrop-blur-[2px] transition-all duration-75 z-60 justify-center items-center`}>
        <div className="w-1/2 h-2/3 text-center text-black flex flex-col gap-4 justify-center">
            <h1 className="text-2xl">Spelet pausat</h1>
            <MenuButton text="Återgå till spelet" onClick={()=> {
                emitEvent("closePause");
                setIsVisible(false);
            }}/>
            <MenuButton text="Achievements"/>
            <MenuButton text="Avsluta spel" onClick={()=> window.location.href = "/"}/>
        </div>
    </section>
}