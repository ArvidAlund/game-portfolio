import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap/gsap-core"
import isOverlapping from "@/app/lib/isOverlapping";
import { emitEvent } from "@/app/utils/eventbus";

export default function PickupBook(){
    const BookRef = useRef(null);
    const [nearPlayer, setNearPlayer] = useState(false);

    useEffect(()=>{
        gsap.to(BookRef.current, {
        y: 20,               // flytta 20px ner
        duration: 0.5,       // 0.5 sekunder
        ease: "power1.in",      // bounce-effekt
        repeat: -1,          // -1 = infinite
        yoyo: true           // går tillbaka och upprepar
        });
    },[])

    /**
       * Effekt för kontinuerlig koll av närhet mellan spelare och hus
       * Körs varje 50ms (20 fps) för att uppdatera nearPlayer state
       */
      useEffect(() => {
        const checkOverlap = () => {
          const player = document.querySelector(".Player");
          if (BookRef.current && player) {
            setNearPlayer(isOverlapping(BookRef.current, player));
          }
        };
    
        const interval = setInterval(checkOverlap, 50);
        return () => clearInterval(interval);
      }, []);

      useEffect(()=>{
        if (nearPlayer){
            emitEvent("addItemInventory", 0);
            emitEvent("inventory", 0);
            emitEvent("inventorySlotActive", 0);
            BookRef.current.remove();
        }
      },[nearPlayer])
    return <div className="absolute bottom-1/7 left-2/3 h-15" ref={BookRef}><img src="/pixelart/assets/misc/book.png" alt="book" className="w-full h-full object-contain"/></div>
}