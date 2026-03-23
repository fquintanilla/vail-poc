function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.79 1.41 1.41-1.79 1.8-1.41-1.42zM12 4V1h-1v3h1zm0 19v-3h-1v3h1zm8-9h3v-1h-3v1zM1 12h3v-1H1v1zm16.24-5.76l1.8-1.79 1.41 1.41-1.79 1.8-1.42-1.42zM4.93 19.07l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zm14.14 0l-1.79 1.8-1.41-1.41 1.8-1.79 1.4 1.4zM12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
    </svg>
  );
}

export function HeaderWeather() {
  return (
    <div
      className="hidden items-center gap-1.5 text-header-muted sm:flex"
      title="Weather"
    >
      <SunIcon className="size-5 shrink-0 text-header-weather" />
      <span className="font-medium tabular-nums">[temperature]</span>
    </div>
  );
}
