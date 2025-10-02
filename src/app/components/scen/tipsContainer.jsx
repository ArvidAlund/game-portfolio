import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { gsap } from "gsap/gsap-core"
import { useEffect, useRef } from "react"

export default function TipsContainer(){
    const tipsRef = useRef();
    useEffect(()=>{
        gsap.fromTo(tipsRef.current, {opacity:0, scale:0}, {opacity:1, scale:1, duration:1, ease:"power2.out"})
    },[])
    return <section ref={tipsRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between items-center w-1/2 text-black">
            <div className="text-center">
                <p className="text-lg">Gå med piltangenterna</p>
                <div className="grid grid-cols-3 gap-2 mt-4 [&_div]:text-center [&_div]:border-2 [&_div]:rounded-sm [&_div]:w-10 [&_div]:aspect-square [&_div]:items-center [&_div]:justify-center [&_div]:flex">
                    <div className="col-start-2 col-span-1"><FontAwesomeIcon icon={faArrowUp}/></div>
                    <div className="col-start-1"><FontAwesomeIcon icon={faArrowLeft}/></div>
                    <div><FontAwesomeIcon icon={faArrowDown}/></div>
                    <div><FontAwesomeIcon icon={faArrowRight}/></div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-lg">Gå med wasd</p>
                <div className="grid grid-cols-3 gap-2 mt-4 [&_div]:text-center [&_div]:border-2 [&_div]:rounded-sm [&_div]:w-10 [&_div]:aspect-square [&_div]:items-center [&_div]:justify-center [&_div]:flex">
                    <div className="col-start-2 col-span-1">W</div>
                    <div className="col-start-1">A</div>
                    <div>S</div>
                    <div>D</div>
                </div>
            </div>
        </section>

}