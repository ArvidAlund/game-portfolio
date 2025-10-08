"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong, faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { AllFrames } from "@/app/hooks/character/animation/allFrames";
import BookImages from "./bookimages";
import TechStack from "../techStack";
import ThreeInARow from "../games/threeInARow";
import { emitEvent, onEvent } from "@/app/utils/eventbus";

/* 
--------------------------------------------------
Page – En enskild boksida
Visar innehåll (children) och sidnummer i hörnet.
Stylingen styr bakgrund, ram, typsnitt och layout.
--------------------------------------------------
*/
function Page({ children, index }) {
  return (
    <div className="absolute inset-0 bg-[#d8c59a] text-[#2b1b0d] p-4 font-[VT323] text-xl border-4 border-[#9b8657] pixel-border box-border overflow-hidden [&>h1]:text-base [&>h1]:uppercase [&>h1]:mb-3 [&>h1]:border-b-2">
      {children}
      <p className={`absolute bottom-0 ${index % 2 === 0 ? "right-2" : "left-2"}`}>{index}</p>
    </div>
  );
}

/* 
--------------------------------------------------
Book – Huvudkomponenten
Visar en "bläddringsbar bok" med olika sidor som 
presenterar portfolioinnehåll. Animationer görs i 3D
med hjälp av GSAP.
--------------------------------------------------
*/
export default function Book() {
  // Aktuell sida (vänstersida = page, högersida = page + 1)
  const [page, setPage] = useState(0);
  // Hindrar flera bläddringar samtidigt
  const [isFlipping, setIsFlipping] = useState(false);
  // Ska boken synas
  const [isVisible, setIsVisible] = useState(false);

  // Refs för DOM-element (används av GSAP)
  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);
  const flipContainerRef = useRef(null);

  // Styr om projektsidan visar sammanfattning eller heltext
  const [summarizeFirst, setSummarizeFirst] = useState(true);

  // För enkel sprite-animation (växlar mellan två frames)
  const [waveFrame, setWaveFrame] = useState(0);

   // Bilder till första projektet (används av BookImages-komponenten)
  const firstProjImg = ["/kod-bilder/vkbilen/1.png", "/kod-bilder/vkbilen/3.png"]

  /* 
  --------------------------------------------------
  useEffect – Hanterar sprite-animation
  Växlar bildruta var 200ms för att simulera rörelse.
  --------------------------------------------------
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveFrame(prev => (prev === 1 ? 0 : 1));
    }, 200);

    return () => clearInterval(interval); // Clean up when component unmounts
  }, []);

  useEffect(() => {
        // Lägg till eventlyssnare
        onEvent("inventory", (detail) =>{
          if (detail === null){
            setIsVisible(false);
          }
          detail === 0 ? setIsVisible(true) : setIsVisible(false);
        })
    }, [])

  useEffect(()=>{
    if (isVisible){
      emitEvent("CanMove", false);
    } else {
      emitEvent("CanMove", true);
    }
  },[isVisible])

  /* 
  --------------------------------------------------
  pages – Innehållet i boken
  Varje sida är en <Page> med eget innehåll och index.
  --------------------------------------------------
  */
  const pages = [
    <Page key={0} index={1}><h1>Arvid Ålunds utvecklarresa</h1>
    <ul className="[&>li>h4]:text-[0.6rem] [&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:border-b-2 [&>li]:mt-2 [&>li]:pb-2">
        <li>
            <h4>Kapitel 1 – Starten</h4>
            <p>3</p>
        </li>
        <li>
            <h4>Kapitel 2 – Studier / Utbildning</h4>
            <p>5</p>
        </li>
        <li>
            <h4>Kapitel 3 – Första riktiga projekt</h4>
            <p>7</p>
        </li>
        <li>
            <h4>Kapitel 4 – Från junior till fullstack</h4>
            <p>9</p>
        </li>
        <li>
            <h4>Kapitel 5 – Vision / Framtid</h4>
            <p>11</p>
        </li>
        <li>
            <h4>Sista sida / avslut</h4>
            <p>13</p>
        </li>
    </ul>
    </Page>,
    <Page key={1} index={2}>
      <p>Hej! Jag heter Arvid och jag bygger digitala världar med kod.</p>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/2 items-center"><img src={AllFrames["waveFrames"][waveFrame]} alt="" className="pixelated w-full"/></div>
      </div>
    </Page>,

    /* Kapitel 1 */
    <Page key={2} index={3}>
        <h1>Kapitel 1 – Starten</h1>
        <p>Jag har alltid fascinerats av programmering, men det var på gymnasiet jag tog det på riktigt. <br /><br /> Min första kod skrev jag i HTML, var väldigt simpel och på andra sidan kan du se på mitt allra första kod.</p>
    </Page>,
    <Page key={3} index={4}>
      <div className="text-md border-2 mt-2 bg-neutral-200">
        {"<h1>Största möjliga rubrik</h1>"}
        <br />
        {"<h2>Underrubrik nivå 2</h2>"}
        <br />
        {"<h3>Underrubrik nivå 3</h3>"}
        <br />
        {"<h4>Underrubrik nivå 4</h4>"}
        <br />
        {"<h5>Underrubrik nivå 5</h5>"}
        <br />
        {"<h6>Underrubrik nivå 6</h6>"}
        </div>
    </Page>,

    /* Kapitel 2 – Studier */
    <Page key={4} index={5}>
        <h1>Kapitel 2 – Studier / Utbildning</h1>
        <ul className="[&>li>div>h4]:text-[0.6rem] [&>li]:border-b-2 [&>li]:mt-2 [&>li]:pb-2 [&>li]:w-full [&>li>div]:flex [&>li>div]:justify-between [&>li>div]:items-center [&>li>p]:text-[0.8rem]">
            <li>
                <div>
                    <h4>Nackademin</h4>
                    <p>2025-2027</p>
                </div>
                <p>Webbutvecklare fullstack Open Source — <br /> React, Node.js, Tailwind, Git</p>
            </li>
            <li>
                <div>
                    <h4>Nyköpings Gymnasium Gripen</h4>
                    <p>2022-2025</p>
                </div>
                <p>Teknikprogrammet info- & mediateknik - <br /> PHP, SCSS, HTML, CSS, JS, Astro, Python, Flask</p>
            </li>
        </ul>
        </Page>,
    <Page key={5} index={6}>
      <p>Jag har insett att en väl fungerande webbplats uppnås genom användarcentrerad design, där användarens behov och en sömlös UX står i fokus.</p>
    </Page>,

    /* Kapitel 3 – Första projektet */
    <Page key={6} index={7}>
        <h1>Kapitel 3 – Första riktiga projekt</h1>
        {summarizeFirst ? (
            <ul className="[&>li]:border-b-2 [&>li]:mt-2 [&>li]:pb-2 [&>li]:w-full [&>li]:flex [&>li>p:first-child]:font-bold [&>li>p:first-child]:text-start [&>li>p:first-child]:mr-1">
                <li>
                    <p>Projekt: </p>
                    <p>Vad kostar bilen (VKB)</p>
                </li>
                <li>
                    <p>Syfte: </p>
                    <p>Beräkna månadskostnaden för att äga en bil, jämföra modeller</p>
                </li>
                <li>
                    <p>Genomförande: </p>
                    <p>Fullständig backend och frontend, inklusive API-integration</p>
                </li>
                <li>
                    <p>Resultat: </p>
                    <p>Belönat gymnasiearbete för innovation och kvalitet</p>
                </li>
            </ul>
        ) : (
            <p>Mitt första omfattande projekt, 'Vad kostar bilen' (VKB), genomförde jag som gymnasiearbete och belönades med pris för sitt innovativa upplägg. Projektet ger användare möjlighet att beräkna månadskostnaden för olika bilar, jämföra modeller och få insikt i den verkliga ägandekostnaden. Projektet inkluderar både frontend och backend samt integration med API:er.</p>
        )}
        <a 
        href="https://github.com/ArvidAlund/VKB" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="underline text-blue-600 hover:text-blue-800"
        >
        Kolla på GitHub
        </a>

        {/* <button className="cursor-pointer border-2 p-2 rounded-lg absolute bottom-4 left-4" onClick={() => setSummarizeFirst(prev => !prev)}>{summarizeFirst ? "Utvidga" : "Sammanfatta"}</button> */}
        </Page>,
        <Page key={7} index={8}>
          <BookImages images={firstProjImg}/>
        </Page>,

        /* Kapitel 4 */
    <Page key={8} index={9}>
        <h1>Kapitel 4 – Från junior till fullstack</h1>
        <p>En ny sida i boken öppnas…</p>
        </Page>,
    <Page key={9} index={10}>
        <TechStack/>
        </Page>,

        /* Kapitel 5 och avslut */
    <Page key={10} index={11}>
        <h1>Kapitel 5 – Vision / Framtid</h1>
        <p>En ny sida i boken öppnas…</p>
        </Page>,
      <Page key={11} index={12}>
        <p>En ny sida i boken öppnas…</p>
        </Page>,

    <Page key={12} index={13}>
        <h1>Sista sida / avslut</h1>
        <p>Spela lite tre i rad!</p>
        <ThreeInARow/>
        </Page>,

      <Page key={13} index={14}>
        <button onClick={()=>setIsVisible(false)}>Stäng boken</button>
        </Page>,
  ];


    /* 
  --------------------------------------------------
  flipPage() – Hanterar sidvändning
  Animerar bläddring åt höger eller vänster med GSAP.
  --------------------------------------------------
  */
  const flipPage = (direction) => {
    if (isFlipping) return;
    if (page === 0 && direction != "next") return;
    if (page === 12 && direction === "next") return;
    setIsFlipping(true);

    const nextPage = direction === "next" ? page + 2 : page - 2;
    const validPage = Math.max(0, Math.min(nextPage, pages.length - 2));

    const flippingRef = direction === "next" ? rightPageRef : leftPageRef;

    // GSAP-timeline för bläddringsanimation
    const tl = gsap.timeline({
      onComplete: () => {
        setPage(validPage); // uppdaterar aktuell sida
        gsap.set(flippingRef.current, { rotateY: 0 }); // nollställer rotering
        setIsFlipping(false);
      },
    });

    tl.to(flippingRef.current, {
      rotateY: direction === "next" ? -180 : 180,
      transformOrigin: direction === "next" ? "left center" : "right center",
      ease: "steps(6)", // hackigt pixelart-bläddrande
      duration: 0.6,
    });
  };

  /* 
  --------------------------------------------------
  useEffect – Ställer in 3D-perspektiv på boken
  Krävs för att sidvändningen ska se realistisk ut.
  --------------------------------------------------
  */
  useEffect(() => {
    gsap.set(flipContainerRef.current, {
      transformStyle: "preserve-3d",
      perspective: 1200,
    });
  }, []);

  /* 
  --------------------------------------------------
  Render – Boklayout och knappar
  --------------------------------------------------
  */
  return (
    <main className={`absolute max-w-[1000px] aspect-[3/2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#bca878] border-[#7e6841] shadow-[4px_4px_0_#2a1c10] pixel-border overflow-hidden z-50 transition-all duration-200 ${isVisible ? "w-2/3 border-8" : "w-0 border-0"}`}>
      <div ref={flipContainerRef} className="relative w-full h-full flex">
        {/* Vänster sida */}
        <div ref={leftPageRef} className="relative w-1/2 h-full transform-gpu">
          {pages[page]}
        </div>

        {/* Höger sida */}
        <div ref={rightPageRef} className="relative w-1/2 h-full transform-gpu">
          {pages[page + 1] || (
            <Page>
              <p className="text-center mt-20">Slut på boken 📘</p>
            </Page>
          )}
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
