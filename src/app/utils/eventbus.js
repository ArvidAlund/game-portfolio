// utils/eventBus.ts

/**
 * Enkel event-bus baserad på EventTarget.
 * Används för att skicka och lyssna på globala events i spelet/applikationen.
 */

const eventBus = new EventTarget();

/**
 * emitEvent – Skickar ett event med ett namn och valfri data.
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
 * onEvent – Lyssnar på ett event med ett specifikt namn.
 *
 * @param {string} name - Namnet på eventet att lyssna på.
 * @param {(event: CustomEvent) => void} handler - Callback som körs när eventet triggas.
 * @returns {() => void} - Funktion för att avregistrera event-lyssnaren.
 *
 * Exempel:
 * const unsubscribe = onEvent("jump-start", () => console.log("Player started jumping"));
 * När du vill sluta lyssna:
 * unsubscribe();
 */
export function onEvent(name, handler) {
  const listener = (event) => handler(event);
  eventBus.addEventListener(name, listener);
  return () => eventBus.removeEventListener(name, listener);
}
