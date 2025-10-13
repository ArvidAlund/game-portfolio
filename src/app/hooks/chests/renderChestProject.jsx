import { useState, useEffect } from "react";

export default function RenderChestProject({index}){
    const [projects, setProjects] = useState([])

    useEffect(()=>{
        const getProjects = async () => {
            try{
                const res = await fetch("/projects.json");
                const jsonData = await res.json();
                setProjects(jsonData.projects)
            } catch (error){
                console.error("Fel vid hämtning av project: ", error);
            }
        }
        
        getProjects();
    },[])

    return <section>
    </section>
}