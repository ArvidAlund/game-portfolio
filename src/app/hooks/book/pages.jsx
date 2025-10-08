import ThreeInARow from "@/app/components/games/threeInARow";
import { AllFrames } from "../character/animation/allFrames";
import { useState, useEffect } from "react";
import BookImages from "@/app/components/book/bookimages";
import TechStack from "@/app/components/techStack";


function Page({ children, index }) {
  return (
    <div className="absolute inset-0 bg-[#d8c59a] text-[#2b1b0d] p-4 font-[VT323] text-xl border-4 border-[#9b8657] pixel-border box-border overflow-hidden [&>h1]:text-base [&>h1]:uppercase [&>h1]:mb-3 [&>h1]:border-b-2">
      {children}
      <p className={`absolute bottom-0 ${index % 2 === 0 ? "right-2" : "left-2"}`}>{index}</p>
    </div>
  );
}

export default function BookPages() {
  const [waveFrame, setWaveFrame] = useState(0);

  const firstProjImg = ["/kod-bilder/vkbilen/1.png", "/kod-bilder/vkbilen/3.png"]

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveFrame((prev) => (prev === 1 ? 0 : 1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
    const interval = setInterval(() => {
      setWaveFrame(prev => (prev === 1 ? 0 : 1));
    }, 200);

    return () => clearInterval(interval); // Clean up when component unmounts
  }, []);

const bookPages = [
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
  return bookPages
}