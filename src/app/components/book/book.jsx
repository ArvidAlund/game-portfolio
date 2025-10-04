import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons"

export default function Book(){
    return <main className="absolute w-9/10 aspect-video left-1/2 top-1/2 -translate-1/2 rounded-xl bookGradient z-100">
        <div className="relative w-fit h-full m-3 bg-[#e7d5b3] text-black rounded-lg">
            <p className="h-9/10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minima tempora laborum possimus explicabo reprehenderit nesciunt molestias in provident, animi et sunt exercitationem assumenda odit eaque. Officiis temporibus necessitatibus nulla?</p>

            <div className="flex justify-between items-center p-4">
                <button className="text-black text-2xl"><FontAwesomeIcon icon={faLeftLong} className="w-full h-full"/></button>
                <button className="text-black text-2xl"><FontAwesomeIcon icon={faRightLong} className="w-full h-full"/></button>
            </div>
        </div>
    </main>
}