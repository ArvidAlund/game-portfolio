export default function Card({children}){
    return <div className="pixelated hover:scale-110 select-none">
        <div className="paper-card">
                <div class="ruff" aria-hidden="true"></div>
                <div class="paper-content">
                    {children}
                </div>
            </div>
    </div> 
}