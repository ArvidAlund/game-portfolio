export default function BookImages({ images }) {
  const imageCount = images.length;

  return (
    <div
      className="grid gap-2 w-full h-full"
      style={{
        gridTemplateRows: `repeat(${imageCount}, 1fr)`, // En rad per bild
        gridAutoColumns: `1fr`, // Varje rad fyller bredden
      }}
    >
      {images.map((image, index) => (
        <div key={index} className="w-full h-full transition-all duration-200 hover:scale-110">
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
