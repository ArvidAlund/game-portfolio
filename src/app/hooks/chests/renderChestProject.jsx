import { useState, useEffect, useRef } from "react";
import { onEvent } from "@/app/utils/eventbus";
import useuseExpandAnimation from "./animation/project/useExpandAnimation";
import { gsap } from "gsap/gsap-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function RenderChestProject({index = 0}){
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(false);
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
        
        const handler = (expand) => {
            projectRef.current.style = "";
            setExpanded(expand);
        }

        onEvent("Expanded", handler);

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

        gsap.fromTo(element, {opacity:0, y:50, scale:0}, {opacity:1, y:0, scale:1, duration:0.5, ease:"power1.out"})

        const handleMouseOver = async ()=>{
            // useuseExpandAnimation(element);
            element.style = "";
            setExpanded(true);
        }

        element.addEventListener("click", handleMouseOver);
        return () =>{
            element.removeListener("click", handleMouseOver);
        }
    }, [show])

    const project = projects[index];

    const handleCloseClick = ()=>{
        setExpanded(false)
    }

    return (project && show ? (
            <section className={`bg-[#f7efd8] text-black p-2 rounded cursor-pointer transition-all duration-200 ${expanded ? "fixed w-1/2 left-1/2 top-1/2 -translate-1/2": "static w-fit"}`} ref={projectRef}>
                {expanded ? (<button className="absolute top-0 right-0" onClick={handleCloseClick}><FontAwesomeIcon icon={faX}/></button>):null}
                <h2>{project.name}</h2>
                {expanded ? (
                    <div className="w-full aspect-video p-1">live demo</div>
                ): null}
                <p>{project.description}</p>
                <div className="flex justify-between underline">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">Demo</a>
                </div>
            </section>
        ):null)
}