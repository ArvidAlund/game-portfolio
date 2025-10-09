const messages = [
    "Det kittlas :)",
    "Jag kom inte på vad man ska skriva här.",
    "Varför kan inte skelett ljuga? — Man ser rakt igenom dem."
]

export default function usePlayerMessage(){
    return messages[Math.floor(Math.random()*messages.length)];
}