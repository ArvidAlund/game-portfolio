export default function useExpandAnimation(element) {
  if (!element) return;

  const elementStyle = element.style

  elementStyle.position = "fixed";

  elementStyle.left = "50%";
  elementStyle.top = "50%";

  elementStyle.transform = "translate(-50%, -50%)";

  elementStyle.width = "50%";
}
