interface Props {
  label: string;
  color: string;
}
function SnowDuckWithBubble({ label, color }: Props) {
  return (
    <div
      className="absolute -top-4 -left-1"
      style={{
        color: color,
      }}
    >
      <div className="relative">
        <svg
          width="64"
          height="30"
          viewBox="0 0 64 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_180_518" fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40.2111 28.4223C40.9482 29.8964 43.0518 29.8964 43.7889 28.4223L46 24H52C58.6274 24 64 18.6274 64 12C64 5.37259 58.6274 5.72205e-06 52 5.72205e-06H12C5.37258 5.72205e-06 0 5.37259 0 12C0 18.6274 5.37258 24 12 24H38L40.2111 28.4223Z"
            />
          </mask>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M40.2111 28.4223C40.9482 29.8964 43.0518 29.8964 43.7889 28.4223L46 24H52C58.6274 24 64 18.6274 64 12C64 5.37259 58.6274 5.72205e-06 52 5.72205e-06H12C5.37258 5.72205e-06 0 5.37259 0 12C0 18.6274 5.37258 24 12 24H38L40.2111 28.4223Z"
            fill="currentColor"
          />
          <path
            d="M43.7889 28.4223L44.6833 28.8695V28.8695L43.7889 28.4223ZM40.2111 28.4223L41.1056 27.9751V27.9751L40.2111 28.4223ZM46 24L45.1056 23.5528L45.382 23H46V24ZM38 24V23H38.618L38.8944 23.5528L38 24ZM44.6833 28.8695C43.5777 31.0807 40.4223 31.0807 39.3167 28.8695L41.1056 27.9751C41.4741 28.7122 42.5259 28.7122 42.8944 27.9751L44.6833 28.8695ZM46.8944 24.4472L44.6833 28.8695L42.8944 27.9751L45.1056 23.5528L46.8944 24.4472ZM46 23H52V25H46V23ZM52 23C58.0751 23 63 18.0751 63 12H65C65 19.1797 59.1797 25 52 25V23ZM63 12C63 5.92487 58.0751 1.00001 52 1.00001V-0.999994C59.1797 -0.999994 65 4.8203 65 12H63ZM52 1.00001H12V-0.999994H52V1.00001ZM12 1.00001C5.92487 1.00001 1 5.92487 1 12H-1C-1 4.8203 4.8203 -0.999994 12 -0.999994V1.00001ZM1 12C1 18.0751 5.92487 23 12 23V25C4.8203 25 -1 19.1797 -1 12H1ZM12 23H38V25H12V23ZM39.3167 28.8695L37.1056 24.4472L38.8944 23.5528L41.1056 27.9751L39.3167 28.8695Z"
            fill="#393939"
            mask="url(#path-1-inside-1_180_518)"
          />
        </svg>

        <div className="absolute top-1 left-[6px] text-xs text-[#393939] whitespace-nowrap">
          {label.length > 5 ? label.slice(0, 4) + "..." : label}
        </div>
      </div>
    </div>
  );
}

export default SnowDuckWithBubble;
