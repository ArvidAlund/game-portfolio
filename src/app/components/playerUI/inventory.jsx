/**
 * Inventory Component
 * -------------------
 *  **Sammanfattning:**
 * Denna React-komponent visar ett inventarie (t.ex. i ett spel) med 5 "slots". 
 * Varje slot kan innehålla en bild (t.ex. ett föremål). 
 * Användaren kan trycka på tangenterna 1–5 för att markera en aktiv slot. 
 * Slotten som är aktiv får en tjockare ram.
 * 
 *  Kortfattat:
 * - 5 tomma platser renderas från start.
 * - Tangenttryckning 1–5 växlar aktiv slot.
 * - Ett exempelobjekt (bok) placeras automatiskt i första sloten vid tangenttryckning.
 * - Aktiv slot markeras visuellt.
 */

import { useState, useEffect } from "react"

export default function Inventory() {
    // ------------------------------------------------------------
    // STATE
    // ------------------------------------------------------------
    // 'slots' innehåller 5 platser i inventariet, alla startar som null (tomma).
    const [slots, setSlots] = useState(Array(5).fill(null))

    // 'active' håller indexet för den aktuellt valda sloten (0–4), eller null om ingen är vald.
    const [active, setActive] = useState(null)

    // ------------------------------------------------------------
    // EFFECT: Tangenttryckning för att hantera aktiv slot
    // ------------------------------------------------------------
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Exempel: lägg en bok i första sloten varje gång man trycker på en tangent
            setSlots((prev) => {
                const newSlots = [...prev]
                newSlots[0] = "/pixelart/assets/misc/book.png"
                return newSlots
            })

            // Om användaren trycker på 1–5: sätt eller avmarkera aktiv slot
            if (["1", "2", "3", "4", "5"].includes(e.key)) {
                const index = Number(e.key) - 1
                setActive((prev) => (prev === index ? null : index))
            }
        }

        // Lägg till eventlyssnare
        window.addEventListener("keydown", handleKeyDown)

        // Rensa bort eventlyssnaren när komponenten tas bort
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    // ------------------------------------------------------------
    // RENDER
    // ------------------------------------------------------------
    return (
        <section className="flex gap-5 items-center justify-center">
            {slots.map((slot, index) => (
                <div
                    key={index}
                    className={`relative h-18 aspect-square rounded-md transition-all duration-75 
                        ${active === index ? "border-4" : "border-2"}`}
                >
                    {/* Bilden i sloten (om någon) */}
                    <img src={slot} alt="" className="w-full h-full object-fill pixelated" />
                    {/* Nummerindikator (1–5) */}
                    <div className="absolute bottom-0 right-1 h-fit">{index + 1}</div>
                </div>
            ))}
        </section>
    )
}
