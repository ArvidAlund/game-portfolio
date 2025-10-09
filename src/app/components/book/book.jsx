"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { emitEvent, onEvent } from "@/app/utils/eventbus";
import useBookPages from "@/app/hooks/book/pages";


export default function Book() {

  const [page, setPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {pages, closeBookButton} = useBookPages();

  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);
  const flipContainerRef = useRef(null);

  const [xpTakenList, setXpTakenList] = useState([0]);

  useEffect(() => {
        const offInventory = onEvent("inventory", (detail) =>{
          if (detail === null){
            setIsVisible(false);
          }
          detail === 0 ? setIsVisible(true) : setIsVisible(false);
        })

        const offChapter = onEvent("chapterRedirect", (pageIndex) => {
          setPage(pageIndex);
        });

        return () => {
          offInventory?.();
          offChapter?.();
        };
    }, [])

  useEffect(()=>{
    if (isVisible){
      emitEvent("CanMove", false);
    } else {
      emitEvent("CanMove", true);
    }
  },[isVisible])

  useEffect(()=>{
    if (closeBookButton){
      setIsVisible(false);
    }
  },[closeBookButton])

  const flipPage = (direction) => {
    if (isFlipping) return;
    if (page === 0 && direction != "next") return;
    if (page === 12 && direction === "next") return;
    setIsFlipping(true);

    const nextPage = direction === "next" ? page + 2 : page - 2;
    const validPage = Math.max(0, Math.min(nextPage, pages.length - 2));

    const flippingRef = direction === "next" ? rightPageRef : leftPageRef;

    const tl = gsap.timeline({
      onComplete: () => {
        setPage(validPage);
        gsap.set(flippingRef.current, { rotateY: 0 });
        if (!xpTakenList.includes(validPage)) {
          emitEvent("AddXp", 60);
        }
        setXpTakenList((prev)=>{
          const newList = [...prev]
          newList.push(validPage);
          return newList
        })
        setIsFlipping(false);
      },
    });

    tl.to(flippingRef.current, {
      rotateY: direction === "next" ? -180 : 180,
      transformOrigin: direction === "next" ? "left center" : "right center",
      ease: "steps(6)",
      duration: 0.6,
    });
  };

  useEffect(() => {
    gsap.set(flipContainerRef.current, {
      transformStyle: "preserve-3d",
      perspective: 1200,
    });
  }, []);

  return (
    <main className={`absolute max-w-[1000px] aspect-[3/2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#bca878] border-[#7e6841] shadow-[4px_4px_0_#2a1c10] pixel-border overflow-hidden z-50 transition-all duration-200 ${isVisible ? "w-2/3 border-8" : "w-0 border-0"}`}>
      <div ref={flipContainerRef} className="relative w-full h-full flex">
        {/* Vänster sida */}
        <div ref={leftPageRef} className="relative w-1/2 h-full transform-gpu">
          {pages[page]}
        </div>

        {/* Höger sida */}
        <div ref={rightPageRef} className="relative w-1/2 h-full transform-gpu">
          {pages[page + 1]}
        </div>

        {/* Bokrygg */}
        <div className="absolute left-1/2 top-0 w-[3px] h-full bg-[#6b5738] shadow-[2px_0_0_#3e2d1d]"></div>
      </div>

      {/* Knappar */}
      <div className="absolute bottom-3 left-0 w-full flex justify-between px-8">
        <button
          className="bg-[#e4d2a3] border-4 border-[#8a754e] text-[#2b1b0d] p-2 pixel-border active:translate-y-[2px] cursor-pointer"
          onClick={() => flipPage("prev")}
        >
          <FontAwesomeIcon icon={faLeftLong} className="w-6 h-6" />
        </button>
        <button
          className="bg-[#e4d2a3] border-4 border-[#8a754e] text-[#2b1b0d] p-2 pixel-border active:translate-y-[2px] cursor-pointer"
          onClick={() => flipPage("next")}
        >
          <FontAwesomeIcon icon={faRightLong} className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}
