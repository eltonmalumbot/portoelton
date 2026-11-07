export default function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className="arrow-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={down ? "M5 5l14 14M5 19h14V5" : "M5 19 19 5M5 5h14v14"} />
    </svg>
  );
}
