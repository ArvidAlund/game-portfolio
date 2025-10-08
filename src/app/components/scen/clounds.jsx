import { useMemo } from "react";

// Lista med molnbilder som kan användas slumpmässigt
const cloudImages = [
  "/pixelart/clouds/cloud1.png",
  "/pixelart/clouds/cloud2.png",
  "/pixelart/clouds/cloud3.png",
  "/pixelart/clouds/cloud4.png",
  "/pixelart/clouds/cloud5.png",
  "/pixelart/clouds/cloud6.png",
];

/**
 * Clouds – renderar ett antal moln i bakgrunden.
 *
 * Molnen får slumpmässig bild och position varje gång komponenten mountas.
 * Molnen genereras med `useMemo` för att undvika omberäkning vid rerender.
 *
 * @param {number} amount – antal moln som ska renderas.
 */
export default function Clouds({ amount }) {
  // Skapar molndata (bild, position) en gång per amount
  const clouds = useMemo(() => {
    const result = [];

    for (let i = 0; i < amount; i++) {
      const src = cloudImages[Math.floor(Math.random() * cloudImages.length)];
      const left = Math.random() * 100; // slumpmässig horisontell position (%)
      const top = Math.random() * 80; // slumpmässig vertikal position (%), max 80% för att hålla inom container
      result.push({ src, left, top });
    }

    return result;
  }, [amount]);

  return (
    <section className="absolute top-0 w-full h-3/5 pointer-events-none overflow-hidden select-none">
      {/* Renderar varje moln som en absolutplacerad bild */}
      {clouds.map((cloud, index) => (
        <img
          key={index}
          src={cloud.src}
          alt={`cloud-${index}`}
          className="absolute origin-center"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
          }}
        />
      ))}
    </section>
  );
}
