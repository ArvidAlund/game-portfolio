export default function Door({ img, exit = false }) {
  return (
    <div
      className={`absolute bottom-1/7 ${exit ? "exitDoor left-1/10 pixelated" : "left-5/6 normalDoor"}`}
      style={{
        width: '130px',    
        height: '200px',      
        backgroundImage: `url('${img}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    ></div>
  );
}
