function randomPoints(n = 1) {
  const tops = Array.from({ length: n }, () => {
    const x = Math.round(Math.random() * 100);
    const y = Math.round(Math.random() * 60);
    return `${x}% ${y}%`;
  });

  return [...tops, "100% 100%", "0% 100%"].join(", ");
}

function MountainLayer({ amount, color, opacity, height, offset }) {
  return (
    <div className="absolute bottom-0 w-full" style={{ height: `${height}px` }}>
      {[...Array(amount)].map((_, index) => {
        const left = (index * 100) / amount;

        return (
          <div
            key={index}
            className={`absolute ${color} opacity-${opacity}`}
            style={{
              left: `${left}%`,
              bottom: `${offset}px`,
              width: "300px",
              height: "100%", // alltid hela lagrets höjd
              clipPath: `polygon(${randomPoints()})`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Mountains({amount}) {
  return (
    <section className="absolute w-full h-[300px] bottom-1/6 overflow-hidden">
      {/* Bakgrund - ljusare */}
      <MountainLayer amount={amount} color="bg-stone-400" opacity={60} height={180} offset={40} />
      {/* Mellanlager */}
      <MountainLayer amount={amount} color="bg-stone-600" opacity={80} height={220} offset={20} />
      {/* Förgrund - mörkast */}
      <MountainLayer amount={amount} color="bg-stone-800" opacity={100} height={260} offset={0} />
    </section>
  );
}
