import isOverlapping from "@/app/lib/isOverlapping";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/gsap-core";
import { emitEvent } from "@/app/utils/eventbus";

/**
 * House – komponent som representerar ett hus i spelvärlden.
 *
 * Funktioner:
 * - Kontrollerar om spelaren är nära huset (collision detection)
 * - Visar en text-bubbla när spelaren är nära
 * - Lyssnar på Enter-tangenten för att "gå in" i huset
 * - Animera in/ut text-bubblan med GSAP
 */
export default function House() {
  const houseRef = useRef(null); // referens till hus-elementet
  const TextRef = useRef(null); // referens till text-bubblan
  const [nearPlayer, setNearPlayer] = useState(false); // true när spelaren är nära huset
  const [showText, setShowText] = useState(false); // true när text-bubblan ska visas

  /**
   * Effekt för kontinuerlig koll av närhet mellan spelare och hus
   * Körs varje 50ms (20 fps) för att uppdatera nearPlayer state
   */
  useEffect(() => {
    const checkOverlap = () => {
      const player = document.querySelector(".Player");
      if (houseRef.current && player) {
        setNearPlayer(isOverlapping(houseRef.current, player));
      }
    };

    const interval = setInterval(checkOverlap, 50);
    return () => clearInterval(interval);
  }, []);

  /**
   * Effekt som hanterar:
   * - Visning/döljning av text-bubbla när spelaren är nära
   * - Lyssning på Enter-tangenten för att emit Event "EnterHouse"
   */
  useEffect(() => {
    setShowText(nearPlayer);

    const handleKey = (e) => {
      if (e.key === "Enter" && nearPlayer) {
        emitEvent("EnterHouse");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nearPlayer]);

  /**
   * Effekt för animation av text-bubblan med GSAP
   * Animera in när showText = true, ut när showText = false
   */
  useEffect(() => {
    if (showText) {
      TextRef.current.style.display = "block";
      gsap.fromTo(
        TextRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    } else {
      gsap.to(TextRef.current, { y: 100, opacity: 0, duration: 1, ease: "power2.out" });
    }
  }, [showText]);

  return (
    <div
      className="absolute bottom-1/8 left-2/3 pixelated House1 select-none z-10"
      ref={houseRef}
    >
      <div className="relative w-full h-full">
        {/* Huset */}
        <img src="/pixelart/houses/house2.png" alt="hus" />

        {/* Text-bubbla som visas när spelaren är nära */}
        <div className="HouseText rounded-xl p-2 hidden" ref={TextRef}>
          <h3 className="text-2xl">Bibloteket</h3>
          <p className="text-xl">Upptäck mer om mig och min resa.</p>
          <p className="text-lg">Tryck <mark>Enter</mark> för att gå in</p>
        </div>
      </div>
    </div>
  );
}
