import PlayerXp from "./playerXp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap/gsap-core"

export default function PlayerUI(){
    const uiRef = useRef(null);
    const [openPause, setOpenPause] = useState(false)

    useEffect(()=>{
        gsap.fromTo(uiRef.current, {y:-100, opacity:0},{y:0, opacity:1, duration:1, ease:"power2.out"})
    },[])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
            setOpenPause(prev => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return <section className="fixed top-0 left-0 w-full h-1/10 flex justify-between z-20" ref={uiRef}>
        <PlayerXp/>
        <button className="cursor-pointer p-8 text-2xl" onClick={()=>setOpenPause(prev=>!prev)}><FontAwesomeIcon icon={openPause ? faPlay : faPause}/></button>
    </section>
}