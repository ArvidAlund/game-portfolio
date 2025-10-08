"use client"

import { useState, useEffect } from "react";
import { emitEvent, onEvent } from "@/app/utils/eventbus";

/**
 * Inventory Component
 * -------------------
 *
 * **Sammanfattning:**
 * React-komponent som visar ett inventarie med 5 slots. 
 * Varje slot kan innehålla ett föremål (bild) och användaren kan välja en aktiv slot 
 * genom att trycka på tangenterna 1–5. Den aktiva sloten markeras visuellt.
 *
 * **Funktionalitet:**
 * - Initialt renderas 5 tomma slots.
 * - Tangenttryckning 1–5 växlar aktiv slot.
 * - Ett exempelobjekt (bok) läggs automatiskt i första sloten vid tangenttryckning.
 * - Aktiv slot får tjockare ram.
 * - Event emitter (`inventory`) skickar aktuell aktiv slot varje gång den ändras.
 *
 * **State:**
 * - `slots` – Array med 5 slots, innehållande bild-URL eller null.
 * - `active` – Index för aktuell slot (0–4), eller null om ingen är aktiv.
 *
 * **Events:**
 * - Tangenttryckning hanteras med `window.addEventListener("keydown")`.
 * - Eventbus används för att emittera `inventory` event med aktiv slot.
 *
 * **UI:**
 * - Flexbox-layout för slots.
 * - Varje slot visar bild (om någon) och ett nummer (1–5).
 * - Aktiv slot markeras med tjockare ram (`border-4`).
 */
export default function Inventory() {
  // ------------------------------------------------------------
  // STATE
  // ------------------------------------------------------------
  const [slots, setSlots] = useState(Array(5).fill(null))
 // 5 tomma slots
  const [active, setActive] = useState(null);              // aktiv slot
  const InventoryItems = ["/pixelart/assets/misc/book.png"]
  // ------------------------------------------------------------
  // EFFECT: Tangenttryckning för att hantera slotar
  // ------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Sätt eller avmarkera aktiv slot om 1–5 trycks
      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        const index = Number(e.key) - 1;
        setActive((prev) => (prev === index ? null : index));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onEvent("inventorySlotActive", (detail) =>{
      setActive(detail);
    })

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  
  useEffect(() => {
    const saved = localStorage.getItem("inventory");
    if (saved) setSlots(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleAddItem = (detail) => {
      setSlots((prev) => {
        const newSlots = [...prev];
        newSlots[detail] = InventoryItems[detail];
        localStorage.setItem("inventory", JSON.stringify(newSlots));
        return newSlots;
      });
    };

    const unsubscribe = onEvent("addItemInventory", handleAddItem);
    return () => unsubscribe?.(); // eller annan cleanup beroende på din eventbus
  }, []);

  // ------------------------------------------------------------
  // EFFECT: Emittera aktiv slot via eventbus
  // ------------------------------------------------------------
  useEffect(() => {
    emitEvent("inventory", active);
  }, [active]);

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------
  return (
    <section className="flex gap-5 items-center justify-center">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`relative h-18 aspect-square rounded-md transition-all duration-75 
            ${active === index ? "border-4 scale-110" : "border-2"}`}
        >
          {/* Slotbild */}
          <img src={slot} alt="" className="w-full h-full object-fill pixelated" />
          {/* Nummerindikator (1–5) */}
          <div className="absolute bottom-0 right-1 h-fit">{index + 1}</div>
        </div>
      ))}
    </section>
  );
}
