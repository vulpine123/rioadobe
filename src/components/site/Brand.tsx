export function RioAdobeMark({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ra-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* outer adobe arch */}
      <path
        d="M50 6 C24 6 8 22 8 50 v44 h84 V50 C92 22 76 6 50 6 Z"
        stroke="url(#ra-grad)"
        strokeWidth="3.5"
        fill="none"
      />
      {/* sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="50" y1="50" x2="50" y2="22"
          stroke="currentColor" strokeOpacity="0.35"
          strokeWidth="1.6" strokeLinecap="round"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      {/* sun disc */}
      <circle cx="50" cy="50" r="14" fill="currentColor" opacity="0.95" />
      {/* monogram */}
      <text
        x="50" y="56"
        textAnchor="middle"
        fontFamily="Anton, sans-serif"
        fontSize="16"
        fill="var(--surface)"
        style={{ letterSpacing: "0.05em" }}
      >RA</text>
    </svg>
  );
}

export function RioAdobeWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <RioAdobeMark size={32} className="text-primary" />
      <span className="flex flex-col leading-none">
        <span className="font-anton text-xl uppercase tracking-tight text-primary">Rio Adobe</span>
        <span className="text-[8px] tracking-[0.4em] uppercase text-on-surface-variant mt-0.5">Southwest Cafe</span>
      </span>
    </span>
  );
}
