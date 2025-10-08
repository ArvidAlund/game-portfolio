import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap/gsap-core"
import isOverlapping from "@/app/lib/isOverlapping";
import { emitEvent } from "@/app/utils/eventbus";

export default function PickupBook(){
    const BookRef = useRef(null);
    const [nearPlayer, setNearPlayer] = useState(false);

    useEffect(()=>{
        gsap.to(BookRef.current, {y: 20, duration: 0.5, ease: "power1.in", repeat: -1, yoyo: true});
    },[])

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
    return <div className="absolute bottom-1/7 left-2/3 h-20" ref={BookRef}><img src="/pixelart/assets/misc/book.png" alt="book" className="w-full h-full object-contain"/></div>
}