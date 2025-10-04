import isOverlapping from "@/app/lib/isOverlapping"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap/gsap-core";
import { emitEvent } from "@/app/utils/eventbus";

export default function House(){
    const houseRef = useRef(null);
    const TextRef = useRef(null);
    const [nearPlayer, setNearPlayer] = useState(false);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const checkOverlap = () => {
        const player = document.querySelector(".Player");
        if (houseRef.current && player) {
            setNearPlayer(isOverlapping(houseRef.current, player));
        }
        };

        // Kör kontinuerligt
        const interval = setInterval(checkOverlap, 50); // 20 fps
        return () => clearInterval(interval);
    }, []);

    // Lyssna på Enter
    useEffect(() => {

        if (nearPlayer){
            setShowText(true);
        } else {
            setShowText(false);
        }

        const handleKey = (e) => {
        if (e.key === "Enter" && nearPlayer) {
            console.log("Går in i huset!");
            emitEvent("EnterHouse");
        }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [nearPlayer]);

    useEffect(() => {
        if (showText){
            TextRef.current.style.display = "block";
            gsap.fromTo(TextRef.current, {y:100, opacity:0}, {y:0, opacity:1, duration:1, ease:"power2.out"})
        } else{
            gsap.to(TextRef.current, {y:100, opacity:0, duration:1, ease:"power2.out"})
        }
    }, [showText])

    return <div className="absolute bottom-1/8 left-2/3 pixelated House1 select-none z-10" ref={houseRef}>
        <div className="relative w-full h-full">
            <img src="/pixelart/houses/house2.png" alt="hus" />
            <div className="HouseText rounded-xl p-2 hidden" ref={TextRef}>
                <h3>Bibloteket</h3>
                <p className="text-lg">Upptäck mer om mig och min resa.</p>
                <p className="text-xs">Tryck <mark>Enter</mark> för att gå in</p>

            </div>
        </div>
    </div>
}