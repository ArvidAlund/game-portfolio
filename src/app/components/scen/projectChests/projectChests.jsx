import RenderChest from "@/app/hooks/chests/useRenderChest";
import RenderChestProject from "@/app/hooks/chests/renderChestProject";
/**
 * Renders a fixed bottom row of five chest columns, each containing a project chest and its corresponding chest view.
 *
 * Each column is centered and 250px wide; columns are evenly distributed across the full width and aligned to the bottom.
 * The child components RenderChestProject and RenderChest receive an `index` prop from 0 to 4.
 *
 * @returns {JSX.Element} A section element containing five chest columns.
 */
export default function ProjectChests() {
  return (
    <section className="fixed bottom-1/7 w-full flex justify-evenly items-end">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center w-[250px]">
          <RenderChestProject index={index} />
          <RenderChest index={index}/>
        </div>
      ))}
    </section>
  );
}