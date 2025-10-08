import { emitEvent } from "@/app/utils/eventbus";

export default function Chapter({ index, children }) {
  const handleClick = () => {
    emitEvent("chapterRedirect", index * 2 + 2);
  };

  return (
    <li onClick={handleClick}>
      {children}
    </li>
  );
}
