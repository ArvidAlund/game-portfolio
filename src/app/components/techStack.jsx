import StackIcon from "tech-stack-icons";

export default function TechStack() {
  const names = {
    Frontend: [
      "html5",
      "css3",
      "js",
      "react",
      "nextjs2",
      "vitejs",
      "tailwindcss",
      "astro",
      "gsap",
      "threejs",
    ],
    Backend: ["php", "expressjs", "flask"],
    Databaser: ["mysql", "postgresql", "supabase"],
  };

  return (
    <div className="grid gap-2 w-full h-full">
      {Object.entries(names).map(([category, techs], index) => (
        <div key={index} className="h-fit">
          <h4 className="font-bold mb-2">{category}</h4>
          <div className="grid grid-cols-6 gap-2">
            {techs.map((tech, techIndex) => (
              <div
                key={techIndex}
                className="group flex flex-col items-center w-full transition-all duration-200 hover:scale-110"
              >
                <StackIcon name={tech} />
                <span className="mt-1 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
