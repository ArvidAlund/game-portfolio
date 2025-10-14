/**
 * Centers and sets the width of a DOM element by applying fixed positioning and a translation transform.
 * Mutates the element's inline style to position it at the viewport center and set its width to 50%.
 * @param {HTMLElement|null|undefined} element - The target DOM element; no action is taken if falsy.
 */
export default function useExpandAnimation(element) {
  if (!element) return;

  const elementStyle = element.style

  elementStyle.position = "fixed";

  elementStyle.left = "50%";
  elementStyle.top = "50%";

  elementStyle.transform = "translate(-50%, -50%)";

  elementStyle.width = "50%";
}