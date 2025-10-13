import RenderChest from "@/app/hooks/chests/useRenderChest";
import RenderChestProject from "@/app/hooks/chests/renderChestProject";
export default function ProjectChests() {
  return (
    <section className="absolute bottom-1/7 w-full flex justify-evenly">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="bottom-0">
          <RenderChestProject index={index} />
          <RenderChest key={index} index={index} />
        </div>
      ))}
    </section>
  );
}
