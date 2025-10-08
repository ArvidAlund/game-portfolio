import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";

/**
 * TipsContainer – visar en visuell guide för spelkontroller.
 *
 * Funktioner:
 * - Två sektioner som visar samma rörelseinstruktioner med olika input:
 *   1. Piltangenter (Arrow Keys)
 *   2. WASD
 * - Animeras in med GSAP vid mount (fade + scale).
 *
 * Layout:
 * - Centrerad på skärmen med flexbox
 * - Varje input-ruta är kvadratisk, centrerad och har border
 */
export default function TipsContainer() {
  const tipsRef = useRef(); // referens till hela tips-container

  // Animerar tips-container när komponenten mountas
  useEffect(() => {
    gsap.fromTo(
      tipsRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      ref={tipsRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between items-center w-1/2 text-black"
    >
      {/* Piltangenter */}
      <div className="text-center">
        <p className="text-xl">Gå med piltangenterna</p>
        <div className="grid grid-cols-3 gap-2 mt-4 [&_div]:text-center [&_div]:border-2 [&_div]:rounded-sm [&_div]:w-10 [&_div]:aspect-square [&_div]:items-center [&_div]:justify-center [&_div]:flex">
          <div className="col-start-2 col-span-1">
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
          <div className="col-start-1">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div>
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>

      {/* WASD */}
      <div className="text-center">
        <p className="text-xl">Gå med WASD</p>
        <div className="grid grid-cols-3 gap-2 mt-4 [&_div]:text-center [&_div]:border-2 [&_div]:rounded-sm [&_div]:w-10 [&_div]:aspect-square [&_div]:items-center [&_div]:justify-center [&_div]:flex">
          <div className="col-start-2 col-span-1">W</div>
          <div className="col-start-1">A</div>
          <div>S</div>
          <div>D</div>
        </div>
      </div>
    </section>
  );
}
