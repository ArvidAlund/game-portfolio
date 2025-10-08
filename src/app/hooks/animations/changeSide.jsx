import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { onEvent } from "@/app/utils/eventbus";

/**
 * ChangeSide – hanterar en "blad/övergång"-animation med två paneler.
 *
 * Funktioner:
 * - Två svarta divs som glider åt vänster och höger för att skapa övergångseffekt.
 * - Lyssnar på globala events via eventbus: "OpenAnimation" och "CloseAnimation".
 * - GSAP används för smidig animation.
 *
 * Användning:
 * - Skickar du "OpenAnimation" event så glider panelerna utåt.
 * - Skickar du "CloseAnimation" event så glider panelerna tillbaka.
 */
export default function ChangeSide() {
  const rightRef = useRef(null); // Höger panel
  const leftRef = useRef(null); // Vänster panel
  const containerRef = useRef(null); // Behållare för paneler
  const isAnimating = useRef(false); // Förhindrar att animation startar igen innan nuvarande är klar

  useEffect(() => {
    // Öppna-animation
    const Open = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      containerRef.current.style.display = "block";

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          // reset dimensioner
          containerRef.current.style.height = 0;
          containerRef.current.style.width = 0;
        }
      });

      tl.fromTo(
        leftRef.current,
        { x: 0 },
        { x: -leftRef.current.offsetWidth, duration: 1, delay: 0.5, ease: "power2.out" }
      ).fromTo(
        rightRef.current,
        { x: 0 },
        { x: rightRef.current.offsetWidth, duration: 1, ease: "power2.out" },
        "<" // startar samtidigt som vänster panel
      );
    };

    // Stäng-animation
    const Close = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      containerRef.current.style.display = "block";

      containerRef.current.style.height = "100%";
      containerRef.current.style.width = "100%";

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        }
      });

      tl.fromTo(
        leftRef.current,
        { x: -leftRef.current.offsetWidth },
        { x: 0, duration: 1, ease: "power2.out" }
      ).fromTo(
        rightRef.current,
        { x: rightRef.current.offsetWidth },
        { x: 0, duration: 1, ease: "power2.out" },
        "<"
      );
    };

    // Prenumerera på events
    const unsubscribeOpen = onEvent("OpenAnimation", Open);
    const unsubscribeClose = onEvent("CloseAnimation", Close);

    // Rensa eventlisteners vid unmount
    return () => {
      unsubscribeOpen();
      unsubscribeClose();
    };
  }, []);

  return (
    <section
      className="absolute z-[100] w-full h-full [&>div]:absolute [&>div]:w-1/2 [&>div]:h-full [&>div]:bg-black hidden"
      ref={containerRef}
    >
      <div className="left-0" ref={leftRef}></div>
      <div className="right-0" ref={rightRef}></div>
    </section>
  );
}
