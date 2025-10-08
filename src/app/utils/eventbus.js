// utils/eventBus.js

/**
 * Enkel event-bus baserad på EventTarget.
 * Används för att skicka och lyssna på globala events i spelet/applikationen.
 */
const eventBus = new EventTarget();

/**
 * Skickar ett event med ett namn och valfri data.
 *
 * @param {string} name - Namnet på eventet.
 * @param {any} detail - Data som ska skickas med eventet (valfritt).
 *
 * Exempel:
 * emitEvent("jump-start");
 * emitEvent("EnterHouse", { playerId: 1 });
 */
export function emitEvent(name, detail) {
  eventBus.dispatchEvent(new CustomEvent(name, { detail }));
}

/**
 * Lyssnar på ett event med ett specifikt namn.
 *
 * @param {string} name - Namnet på eventet att lyssna på.
 * @param {function} handler - Callback som körs när eventet triggas.
 * @returns {function} - Funktion för att avregistrera event-lyssnaren.
 *
 * Exempel:
 * const unsubscribe = onEvent("jump-start", () => console.log("Player started jumping"));
 * unsubscribe(); // när du vill sluta lyssna
 */
export function onEvent(name, handler) {
  if (typeof handler !== "function") {
    throw new Error("Handler måste vara en funktion");
  }

  const listener = (event) => {
    handler(event.detail); // skicka bara detail till callback
  };

  eventBus.addEventListener(name, listener);

  return () => eventBus.removeEventListener(name, listener);
}
