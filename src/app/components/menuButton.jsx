export default function MenuButton({ text, onClick, ref=null }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#f7efd8]
        text-black
        text-2xl
        px-6 py-3
        border-4 border-black
        shadow-[4px_4px_0px_0px_black]
        hover:bg-[#e7d6ac]
        active:shadow-[0px_0px_0px_0px_black] active:translate-x-[4px] active:translate-y-[4px]
        select-none
        cursor-pointer
      "
      ref={ref}
    >
      {text}
    </button>
  );
}
