<!-- Improved compatibility of back to top link -->

<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ArvidAlund/game-portfolio">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Game Portfolio</h3>

  <p align="center">
    En interaktiv portfolio byggd med en spelinspirerad design där användaren kan utforska dina projekt, färdigheter och kontaktuppgifter som om det vore en spelvärld.
    <br />
    <a href="https://game-portfolio-six.vercel.app/"><strong>Besök portfolion »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ArvidAlund/game-portfolio">Visa demo</a>
    &middot;
    <a href="https://github.com/ArvidAlund/game-portfolio/issues/new?labels=bug&template=bug-report---.md">Rapportera bugg</a>
    &middot;
    <a href="https://github.com/ArvidAlund/game-portfolio/issues/new?labels=enhancement&template=feature-request---.md">Föreslå funktion</a>
  </p>
</div>

---

## 🎮 Portfolio | Game Time

### 🌐 Länk

🔗 [https://game-portfolio-six.vercel.app/](https://game-portfolio-six.vercel.app/)

---

## 📖 About The Project

Denna portfolio är designad som ett **spel** där användaren navigerar mellan olika zoner som representerar delar av din utvecklarresa — som "About Me", "Projects", "Skills" och "Contact".  
Syftet är att skapa en upplevelse som känns levande, personlig och lekfull — samtidigt som den visar upp din kompetens som webbutvecklare.

[![Product Screenshot][product-screenshot]](https://game-portfolio-six.vercel.app/)

### Wireframe / Koncept

#### 🏠 Zone 0 – Start (Hub / Main Menu)

- En central plats – t.ex. en liten stad/by eller hub world.
- Avatar av dig själv (pixel/ikon).
- HUD visar stats:  
  **Frontend:** ⭐⭐⭐⭐ **Backend:** ⭐⭐⭐ **Databases:** ⭐⭐
- Knappar: `Enter World` / piltangenter för att utforska.
- Interaktivitet: klicka på skyltar/dörrar för att gå till andra zoner.

#### 📜 Zone 1 – About Me

- Visuellt: bibliotek eller hus med din personliga story.
- Presentation + tidslinje med din utvecklarresa.
- Avatar levlar upp (student → junior → fullstack).
- “Bläddra i bok” = CV-modal.
- Easter egg: Tryck på avataren → `"Coffee-driven developer ☕"`.

#### 🧰 Zone 2 – Projects

- Visuellt: marknad/dungeon med kistor/portaler.
- Varje projekt = kista som öppnar modal med:
  - Namn
  - Tech stack (ikoner)
  - Repo-länk + live demo
- Kategorier:  
  🟦 Frontend 🟩 Backend 🟪 Fullstack
- Interaktivitet: “Loot chest”-animation, filter i HUD.

#### ⚔️ Zone 3 – Skills

- Visuellt: dojo eller futuristiskt “skill tree”.
- Skills representerade som items (svärd = React, sköld = Node).
- Hover → erfarenhetsnivå (basic/intermediate/advanced).
- Klick → exempel på användning i kod/projekt.

#### 🔮 Zone 4 – Contact

- Visuellt: “Boss gate” eller stor portal.
- Kontaktformulär (namn, mejl, meddelande).
- Länkar till LinkedIn, GitHub.
- Easter egg: “hire me” → special animation.

#### 🧩 HUD / Meny (alltid synlig)

- Avatar + namn
- XP-bar som fylls när man utforskar
- Snabbnavigation: Home | Projects | Skills | Contact

#### 🏆 Gamification

- Achievements:
  - “Explorer” (besökt alla zoner)
  - “Quest Master” (kollat alla projekt)
- Mini-game gömt (Snake/Pong)
- Retro cheat code: ↑ ↑ ↓ ↓ ← → ← → B A → hemlig sektion

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🧱 Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Supabase][Supabase-shield]](https://supabase.com/)
- [![Vercel][Vercel-shield]](https://vercel.com/)
- [![GSAP][GSAP-shield]](https://greensock.com/gsap/)
- [![Framer Motion][FramerMotion-shield]](https://www.framer.com/motion/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🚀 Getting Started

För att köra projektet lokalt:

### Installation

1. Klona repot
   ```bash
   git clone https://github.com/ArvidAlund/game-portfolio.git
   ```
