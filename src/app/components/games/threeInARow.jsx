"use client";
import { useState } from "react";

/**
 * En enkel "Tre i rad" (tic-tac-toe) komponent med en mänsklig spelare ("X")
 * mot en enkel bot ("O") som gör slumpmässiga drag.
 * 
 * Spel-logiken hanteras helt lokalt via React state.
 */
export default function ThreeInARow() {
  // Representerar spelbrädet som en array med 9 rutor (null, "X" eller "O")
  const [cells, setCells] = useState(Array(9).fill(null));

  /**
   * Hanterar spelarens drag.
   * - Ignorerar klick om rutan redan är tagen eller om spelet är avgjort.
   * - Uppdaterar brädet med spelarens drag och kollar om det leder till vinst.
   * - Låter boten göra sitt drag efter en kort delay om spelet inte är slut.
   */
  function makeMove(index) {
    if (cells[index] || checkWinner(cells)) return;

    const newCells = [...cells];
    newCells[index] = "X";
    setCells(newCells);

    if (checkWinner(newCells)) return;

    // Simulerar botens drag efter en kort paus
    setTimeout(() => {
      makeBotMove(newCells);
    }, 500);
  }

  /**
   * Gör ett slumpmässigt drag för boten ("O") på en ledig ruta.
   * - Beräknar tillgängliga index.
   * - Väljer en av dem slumpmässigt.
   * - Uppdaterar brädet med botens drag.
   */
  function makeBotMove(currentCells) {
    const emptyIndexes = currentCells
      .map((val, i) => (val === null ? i : null))
      .filter((v) => v !== null);

    if (emptyIndexes.length === 0) return; // Brädet är fullt

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newCells = [...currentCells];
    newCells[randomIndex] = "O";
    setCells(newCells);
  }

  /**
   * Kontrollerar om någon har vunnit.
   * - Loopar genom alla vinstkombinationer.
   * - Returnerar vinnaren ("X" eller "O") om tre i rad hittas, annars null.
   */
  function checkWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  // Beräknar vinnaren vid varje render
  const winner = checkWinner(cells);

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-2xl mb-2">
        {winner ? `${winner} vann!` : "Din tur!"}
      </h1>

      {/* Renderar 3x3-brädet */}
      <div className="grid grid-cols-3 gap-1">
        {cells.map((val, index) => (
          <div
            key={index}
            className="w-20 h-20 border-2 flex items-center justify-center text-5xl cursor-pointer"
            onClick={() => makeMove(index)}
          >
            {val}
          </div>
        ))}
      </div>
    </section>
  );
}
