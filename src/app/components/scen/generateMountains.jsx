/**
 * Skapar en slumpmässig polygon för ett "berg" genom att generera punkter.
 * @param {number} n – antal slumpade punkter (default 1)
 * @returns {string} – clip-path polygon-punkter som CSS
 *
 * Lägg till hörn i botten så att polygonen alltid täcker från botten till toppen.
 */
function randomPoints(n = 1) {
  const tops = Array.from({ length: n }, () => {
    const x = Math.round(Math.random() * 100);
    const y = Math.round(Math.random() * 60);
    return `${x}% ${y}%`;
  });

  return [...tops, "100% 100%", "0% 100%"].join(", ");
}

/**
 * MountainLayer – renderar ett lager av berg som ett antal div:ar
 * med slumpmässig polygonform och position.
 *
 * @param {number} amount – antal "berg" i laget
 * @param {string} color – Tailwind färgklass för lagret
 * @param {number} opacity – Tailwind opacity (0-100)
 * @param {number} height – lagrets höjd i px
 * @param {number} offset – vertikal förskjutning från bottom
 */
function MountainLayer({ amount, color, opacity, height, offset }) {
  return (
    <div className="absolute bottom-0 w-full" style={{ height: `${height}px` }}>
      {[...Array(amount)].map((_, index) => {
        // Sprid bergen jämnt över bredden, med liten justering
        const left = (index * 100) / amount - 2;

        return (
          <div
            key={index}
            className={`absolute ${color} opacity-${opacity} object-center`}
            style={{
              left: `${left}%`,
              bottom: `${offset}px`,
              width: "300px",
              height: "100%", // alltid hela lagrets höjd
              clipPath: `polygon(${randomPoints()})`, // ger bergets form
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Mountains – wrapper-komponent som renderar tre lager av berg
 * för att skapa djup och perspektiv.
 *
 * @param {number} amount – antal berg per lager
 *
 * Lager:
 * 1. Bakgrund (ljusast)
 * 2. Mellanlager (mellan)
 * 3. Förgrund (mörkast)
 *
 * Alla lager använder MountainLayer för individuell polygon-rendering.
 */
export default function Mountains({ amount }) {
  return (
    <section className="absolute w-full h-[300px] bottom-1/6 overflow-hidden">
      {/* Bakgrund - ljusare */}
      <MountainLayer
        amount={amount}
        color="bg-stone-400"
        opacity={60}
        height={180}
        offset={40}
      />
      {/* Mellanlager */}
      <MountainLayer
        amount={amount}
        color="bg-stone-600"
        opacity={80}
        height={220}
        offset={20}
      />
      {/* Förgrund - mörkast */}
      <MountainLayer
        amount={amount}
        color="bg-stone-800"
        opacity={100}
        height={260}
        offset={0}
      />
    </section>
  );
}
