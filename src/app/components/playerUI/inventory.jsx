import { useState, useEffect } from "react"

export default function Inventory(){
    const [slots, setSlots] = useState(Array(5).fill(null))
    const [active, setActive] = useState(null);
    useEffect(() => {
        const handleKeyDown = (e) => {
            setSlots((prev) =>{
                const newSlots = [...prev]
                newSlots[0] = "/pixelart/assets/misc/book.png"
                return newSlots
            })
            if (["1", "2", "3", "4", "5"].includes(e.key)) {
            const index = Number(e.key) - 1;

            setActive((prev) => (prev === index ? null : index));
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return <section className="flex gap-5 items-center justify-center">
        {slots.map((slot, index) => (
            <div key={index} className={`relative h-18 aspect-square rounded-md transition-all duration-75 ${active === index ? "border-4":"border-2"}`}>
                <img src={slot} alt="" className="w-full h-full object-fill pixelated"/>
                <div className="absolute bottom-0 right-1 h-fit">{index + 1}</div>
                </div>
        ))}
    </section>
}