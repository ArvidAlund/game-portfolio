# Portfolio | Game time

## Länk

https://game-portfolio-six.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Wireframe för spel-vibe portfolio

## Start (Hub / Main Menu)

Visuellt: En central plats, typ som en liten stad/by eller “hub world”.

Innehåll:

Avatar av dig själv (kan vara pixel/ikon eller stiliserad figur).

En enkel meny/HUD:

Stats: Frontend: ⭐⭐⭐⭐, Backend: ⭐⭐⭐, Databases: ⭐⭐

Knappar: [Enter World] eller piltangenter för att börja utforska.

Interaktivitet:

Klicka på skyltar eller dörrar för att gå till andra zoner.

## Zone 1 – About Me (Profilområdet)

Visuellt: Ett litet “hus” eller bibliotek där spelaren kan läsa din story.

Innehåll:

Kort presentation av dig.

Liten timeline med din utvecklarresa.

Avatar som levlar upp med tiden (t.ex. student → junior → fullstack).

Interaktivitet:

“Bläddra i en bok” = en modal med ditt CV.

Easter egg: Tryck på din avatar för ett hemligt meddelande (“Coffee-driven developer ☕”).

## Zone 2 – Projects (Quest Area)

Visuellt: En marknad eller dungeon med olika kistor/portaler.

Innehåll:

Varje projekt = en kista/portal.

När användaren klickar på en kista:

Modal öppnas med projektets namn, tech stack (ikoner), repo-länk och live demo.

Projekten kategoriserade i färger:

🟦 Frontend

🟩 Backend

🟪 Fullstack

Interaktivitet:

“Loot chest”-animation när ett projekt öppnas.

Filter-knappar i HUD (t.ex. show frontend only).

## Zone 3 – Skills (Training Grounds)

Visuellt: En dojo, träningsplats eller futuristiskt “skill tree”.

Innehåll:

Skills som ikoner (React, Next.js, Node.js, SQL, Supabase, etc).

Power-up känsla: varje skill representeras som en “item” (ex: svärd = React, sköld = Node).

Interaktivitet:

Hover på en skill → visar din erfarenhetsnivå (basic/intermediate/advanced).

Klick → liten pop-up med exempel på kod/projekt där du använt den.

## Zone 4 – Contact (Boss Room / Portal)

Visuellt: En stor port eller “boss gate”.

Innehåll:

Kontaktformulär (namn, mejl, meddelande).

Länkar till LinkedIn, GitHub.

Interaktivitet:

När formuläret skickas: liten animation (“du besegrade bossen → meddelande skickat!”).

Easter egg: Om man skriver “hire me” i meddelandet → extra animation.

## HUD / Meny (alltid synlig)

Visuellt: Retro statusrad, likt i spel.

Innehåll:

Avatar + namn.

XP-bar (fylls ju mer man utforskar).

Knappar för snabb navigation: Home, Projects, Skills, Contact.

Extra Easter Eggs / Gamification

XP-system → Lås upp achievements:

"Explorer" (navigerat till alla zoner).

"Quest Master" (kollat på alla projekt).

Liten mini-game (t.ex. Snake eller Pong) gömt någonstans.

Retro cheat code: ↑ ↑ ↓ ↓ ← → ← → B A → öppnar en hemlig sektion.
