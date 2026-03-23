import { CloudOff } from 'lucide-react';
import { weatherHeaderIconClass } from '@/components/header/WeatherLucideIcon';

export function HeaderWeatherUnavailable() {
  return (
    <div
      className="hidden items-center gap-1.5 text-header-muted sm:flex"
      title="Weather"
    >
      <CloudOff
        aria-hidden
        className={weatherHeaderIconClass}
        strokeWidth={2}
      />
      <span className="font-medium tabular-nums">—</span>
    </div>
  );
}
