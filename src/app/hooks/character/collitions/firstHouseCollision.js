import isOverlapping from "@/app/lib/isOverlapping";

export default function firstHouseCollision(){
    const player = document.querySelector(".Player");
    const house = document.querySelector(".House1");

    if (isOverlapping(player,house)){
        console.log("Collition!");
    }
}