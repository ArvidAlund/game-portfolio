"use client";
import { useState } from "react";

export default function ThreeInARow() {
  const [cells, setCells] = useState(Array(9).fill(null));

  function makeMove(index) {
    // Om rutan är upptagen eller spelet är slut, gör inget
    if (cells[index] || checkWinner(cells)) return;

    const newCells = [...cells];
    newCells[index] = "X"; // Spelarens drag
    setCells(newCells);

    // Kolla om spelaren vann
    if (checkWinner(newCells)) return;

    // Botens drag efter liten delay
    setTimeout(() => {
      makeBotMove(newCells);
    }, 500);
  }

  function makeBotMove(currentCells) {
    const emptyIndexes = currentCells
      .map((val, i) => (val === null ? i : null))
      .filter((v) => v !== null);

    if (emptyIndexes.length === 0) return; // fullt bräde

    // Välj en slumpmässig ledig ruta
    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newCells = [...currentCells];
    newCells[randomIndex] = "O";
    setCells(newCells);
  }

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

  const winner = checkWinner(cells);

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-2xl mb-2">
        {winner ? `${winner} vann!` : "Din tur!"}
      </h1>

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
