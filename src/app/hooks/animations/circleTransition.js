export function CircleTransition({ show }) {
  return (
    <div
      className={`fixed inset-0 bg-black pointer-events-none transition-all duration-[800ms] ${
        show ? "clip-[circle(100%_at_50%_50%)]" : "clip-[circle(0%_at_50%_50%)]"
      }`}
      style={{ zIndex: 9999 }}
    />
  );
}
