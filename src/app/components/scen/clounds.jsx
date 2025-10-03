import { useMemo } from "react";

const cloudImages = [
  "/pixelart/clouds/cloud1.png",
  "/pixelart/clouds/cloud2.png",
  "/pixelart/clouds/cloud3.png",
  "/pixelart/clouds/cloud4.png",
  "/pixelart/clouds/cloud5.png",
  "/pixelart/clouds/cloud6.png",
];

export default function Clouds({ amount }) {
  // Generera moln en gång med useMemo så de inte ändras vid rerender
  const clouds = useMemo(() => {
    const result = [];

    for (let i = 0; i < amount; i++) {
      const src = cloudImages[Math.floor(Math.random() * cloudImages.length)];
      const left = Math.random() * 100; // slumpad horisontell position
      const top = Math.random() * 80; // slumpad vertikal position, max 80% för att inte gå ur container
      result.push({ src, left, top });
    }

    return result;
  }, [amount]);

  return (
    <section className="absolute top-0 w-full h-3/5 pointer-events-none overflow-hidden select-none">
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
