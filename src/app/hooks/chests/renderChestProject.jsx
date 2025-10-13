import { useState, useEffect } from "react";

export default function RenderChestProject({index = 0}){
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        const getProjects = async () => {
            try{
                const res = await fetch("/projects.json");
                const jsonData = await res.json();
                console.log(jsonData.Projects)
                setProjects(jsonData.Projects || []);
            } catch (error){
                console.error("Fel vid hämtning av project: ", error);
            }
        }
        
        getProjects();
    },[])


    const project = projects[index];

    return <section className={`bg-[#f7efd8] text-black p-2 rounded w-fit`}>
        {project ? (
            <>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className="flex justify-between underline">
                <a href={project.github} target="_blank">GitHub</a>
                <a href={project.url} target="_blank">Demo</a>
            </div>
            </>
        ): (
            <p>Laddar projektet.....</p>
        )}
    </section>
}