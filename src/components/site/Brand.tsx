export function RioAdobeMark({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <img 
      src="https://rioadobe.com/RA-Red.gif" 
      alt="Rio Adobe" 
      className={`object-contain ${className}`}
      style={{ width: size, height: 'auto' }}
    />
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
