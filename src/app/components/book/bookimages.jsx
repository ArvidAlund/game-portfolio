/**
 * BookImages-komponenten visar en lista av bilder i ett grid-format.
 * Antalet rader i griden anpassas automatiskt efter hur många bilder som skickas in via props.
 * Varje bild får en lätt "hover"-animation som förstorar den något för visuell feedback.
 */

export default function BookImages({ images }) {

  return (
    <div
      className="grid gap-2 w-full h-full"
      style={{
        gridTemplateRows: `repeat(${images.length}, 1fr)`,
        gridAutoColumns: `1fr`,
      }}
    >
      {/* Mappar igenom alla bilder och skapar en bild-container för varje */}
      {images.map((image, index) => (
        <div
          key={index}
          className="w-full h-full transition-all duration-200 hover:scale-110"
        >
          <img
            src={image}
            alt="Bild på project"
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
