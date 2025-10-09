import RenderChest from "@/app/hooks/chests/useRenderChest";

export default function ProjectChests() {
  return (
    <section className="absolute bottom-1/7 w-full flex justify-evenly">
      {Array.from({ length: 5 }).map((_, index) => (
        <RenderChest key={index} index={index} />
      ))}
    </section>
  );
}
