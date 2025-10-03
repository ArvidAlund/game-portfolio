// utils/eventBus.ts
const eventBus = new EventTarget();

export function emitEvent(name, detail) {
  eventBus.dispatchEvent(new CustomEvent(name, { detail }));
}

export function onEvent(name, handler) {
  const listener = (event) => handler(event);
  eventBus.addEventListener(name, listener);
  return () => eventBus.removeEventListener(name, listener);
}
