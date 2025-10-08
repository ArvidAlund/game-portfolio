/**
 * isOverlapping – Kontrollerar om två DOM-element överlappar varandra.
 *
 * @param {HTMLElement} el1 - Första elementet.
 * @param {HTMLElement} el2 - Andra elementet.
 * @returns {boolean} - True om elementen överlappar, annars false.
 *
 * Funktionalitet:
 * - Hämtar bounding rects för båda elementen.
 * - Jämför deras topp, botten, vänster och höger koordinater.
 * - Returnerar false om något element saknas.
 *
 * Användning:
 * if (isOverlapping(playerEl, houseEl)) {
 *   console.log("Player är nära huset");
 * }
 */
export default function isOverlapping(el1, el2) {
  if (!el1 || !el2) return false;

  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}
