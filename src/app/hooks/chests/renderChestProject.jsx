import { useState, useEffect, useRef } from "react";
import { onEvent } from "@/app/utils/eventbus";

export default function RenderChestProject({index = 0}){
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState(false);
    const projectRef = useRef(null);

    useEffect(()=>{
        const getProjects = async () => {
            try{
                const res = await fetch("/projects.json");
                const jsonData = await res.json();
                setProjects(jsonData.Projects || []);
            } catch (error){
                console.error("Fel vid hämtning av project: ", error);
            }
        }
        
        getProjects();
    },[])

    useEffect(()=>{
        const removeListener = onEvent(`showProject-${index}`, ()=>{
            setShow(true);
        })

        return () => {
            removeListener();
        }
    },[index])

    useEffect(()=>{
        if (!show) return
        const element = projectRef.current;
        if (!element) return;

        const handleMouseOver = ()=>{
            console.log("yes sir")
        }

        element.addEventListener("mouseover", handleMouseOver);
        return () =>{
            element.removeListener("mouseover", handleMouseOver);
        }
    }, [show])

    const project = projects[index];

    return (project && show ? (
            <section className={`bg-[#f7efd8] text-black p-2 rounded w-fit`} ref={projectRef}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div className="flex justify-between underline">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">Demo</a>
                </div>
            </section>
        ):null)
}