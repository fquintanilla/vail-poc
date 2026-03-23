import { Loader2 } from 'lucide-react';
import { weatherHeaderIconClass } from '@/components/header/WeatherLucideIcon';

export function HeaderWeatherSkeleton() {
  return (
    <div
      aria-busy="true"
      className="hidden items-center gap-1.5 text-header-muted sm:flex"
      title="Weather"
    >
      <Loader2
        aria-hidden
        className={`${weatherHeaderIconClass} animate-spin text-header-muted`}
        strokeWidth={2}
      />
      <span className="block font-medium tabular-nums">
        <span
          aria-hidden
          className="block h-[1.25rem] w-10 animate-pulse rounded-sm bg-header-muted/30"
        />
      </span>
    </div>
  );
}
