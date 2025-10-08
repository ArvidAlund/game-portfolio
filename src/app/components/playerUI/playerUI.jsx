"use client"

import PlayerXp from "./playerXp";
import Inventory from "./inventory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { emitEvent, onEvent } from "@/app/utils/eventbus";

/**
 * PlayerUI – huvudkomponenten för spelarens gränssnitt.
 *
 * Visar spelarens XP, inventory och en knapp för att pausa/sätta igång spelet.
 * Hanterar även en enkel in-/ut-animation med GSAP samt lyssnar på Escape-tangenten
 * för att toggla pausmenyn.
 */
export default function PlayerUI() {
  const uiRef = useRef(null);        // Referens till hela UI-sektionen (för animation)
  const [openPause, setOpenPause] = useState(false); // Styr om spelet är pausat eller inte

  /**
   * Initierar en in-animation för UI:t när komponenten monteras.
   * UI:t glider in uppifrån och fadar in med en GSAP-animation.
   */
  useEffect(() => {
    gsap.fromTo(
      uiRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  /**
   * Lyssnar på Escape-tangenten för att toggla pausläge.
   * Event listenern tas bort vid unmount för att undvika minnesläckor.
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenPause((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    onEvent("closePause", ()=>{
      setOpenPause(false)
    })

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() =>{
    emitEvent("OpenPause", openPause);
  },[openPause])

  return (
    <section
      ref={uiRef}
      className="fixed top-0 left-0 w-full h-1/10 flex justify-between z-20"
    >
      {/* Spelarens XP-indikator */}
      <PlayerXp />

      {/* Inventory-sektion */}
      <Inventory />

      {/* Paus-/spela-knapp, växlar ikon beroende på status */}
      <button
        className="cursor-pointer p-8 text-2xl"
        onClick={() => setOpenPause((prev) => !prev)}
      >
        <FontAwesomeIcon icon={openPause ? faPause : faPlay} />
      </button>
    </section>
  );
}
