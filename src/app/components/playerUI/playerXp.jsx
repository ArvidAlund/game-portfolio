export default function PlayerXp({xp = 50}){
    const levels = [100, 200, 250, 400];
    const levelXp = [100,200,250,400];
    let currentLevel = levels.findIndex(lvlXp => xp < lvlXp);
    if (currentLevel === -1) currentLevel = levels.length;
    const fillPercent = Math.min((xp / levelXp[currentLevel]) * 100, 100);
    return <div className="w-1/3 flex p-2 items-center">
        <div className="w-full h-4 bg-gray-300 rounded overflow-hidden mr-2">
            <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{width: `${fillPercent}%`}}
            />
        </div>
        <div className="flex flex-nowrap w-25">
            <span className="flex">{xp} / {levelXp[currentLevel]} XP</span>
        </div>
    </div>
}