import RenderChest from "@/app/hooks/chests/useRenderChest";
import RenderChestProject from "@/app/hooks/chests/renderChestProject";
export default function ProjectChests() {
  return (
    <section>
    <section className="absolute bottom-1/7 w-full flex justify-evenly items-end">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center w-[250px]">
          <RenderChestProject index={index} />
          <RenderChest index={index}/>
        </div>
      ))}
    </section>
    </section>
  );
}
