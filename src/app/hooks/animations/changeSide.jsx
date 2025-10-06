import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { onEvent } from "@/app/utils/eventbus";

export default function ChangeSide() {
  const rightRef = useRef(null);
  const leftRef = useRef(null);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const Open = () => {
      if (isAnimating.current) return; // kör inte igen om pågår
      isAnimating.current = true;

      containerRef.current.style.display = "block";

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false; // redo för nästa gång
          containerRef.current.style.height = 0;
          containerRef.current.style.width = 0;
        }
      });

      tl.fromTo(
        leftRef.current,
        { x: 0 },
        { x: -leftRef.current.offsetWidth, duration: 1, delay:0.5, ease: "power2.out" }
      ).fromTo(
        rightRef.current,
        { x: 0 },
        { x: rightRef.current.offsetWidth, duration: 1, ease: "power2.out" },
        "<"
      );
    };

    const Close = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      containerRef.current.style.display = "block";

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

    const unsubscribeOpen = onEvent("OpenAnimation", Open);
    const unsubscribeClose = onEvent("CloseAnimation", Close);

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
