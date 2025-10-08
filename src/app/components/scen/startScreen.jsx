"use client";

import Card from "../card";
import { gsap } from "gsap";
import { useState, useEffect, useRef } from "react";

/**
 * StartScreen – visuell introduktion innan spelet startar.
 *
 * Funktioner:
 * - Visar profilbild, namn och titel i ett kort.
 * - Startknapp som triggar animation och stänger startskärmen.
 * - Animerar både kort och knapp med GSAP när spelet startas.
 *
 * @param {Function} onClose – callback som körs när startskärmen ska stängas
 */
export default function StartScreen({ onClose }) {
  const menuRef = useRef(null);   // referens till kortet
  const buttonRef = useRef(null); // referens till startknappen
  const [startGame, setStartGame] = useState(false); // state som triggar start-animation

  /**
   * Effekt som körs när startGame blir true:
   * - Animerar kortet uppåt och minskar skalan
   * - Animerar knappen nedåt utanför skärmen
   * - Kör onClose efter animationen (1s)
   */
  useEffect(() => {
    if (startGame) {
      const tl = gsap.timeline();

      tl.to(menuRef.current, {
        y: -window.innerHeight,
        scale: 0.5,
        duration: 1,
        ease: "power2.out",
      });

      tl.to(
        buttonRef.current,
        { y: window.innerHeight, duration: 1, ease: "power2.out" },
        "<"
      );

      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [startGame]);

  return (
    <section className="absolute w-full h-full z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Kort med profilinfo */}
      <div ref={menuRef}>
        <Card>
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHaUFzbY8CV2A/profile-displayphoto-scale_200_200/B4DZjqPx88GkAg-/0/1756276663263?e=1762387200&v=beta&t=U3JSmzMn9CEIggV_3b9UjOwN9r2o93kG8Gj-0qzLEV0"
              alt="profilbild"
              className="m-8 rounded-full"
            />
            <h1 className="text-2xl lg:text-5xl font-bold">Arvid Ålund</h1>
            <p className="text-3xl m-4">Fullstack utvecklare</p>
          </div>
        </Card>
      </div>

      {/* Startknapp */}
      <button
        className="border-2 border-black rounded-lg p-2 mb-5 text-black text-2xl bg-white cursor-pointer hover:!scale-110"
        ref={buttonRef}
        onClick={() => setStartGame((prev) => !prev)}
      >
        Starta äventyret
      </button>
    </section>
  );
}
