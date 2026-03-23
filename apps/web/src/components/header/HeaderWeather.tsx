import { Suspense } from "react";
import { HeaderWeatherSkeleton } from "@/components/header/HeaderWeatherSkeleton";
import { HeaderWeatherUnavailable } from "@/components/header/HeaderWeatherUnavailable";
import { WeatherLucideIcon } from "@/components/header/WeatherLucideIcon";
import { getWeather } from "@/lib/server/weather";

async function HeaderWeatherContent() {
  const weather = await getWeather();

  if (!weather.available) {
    return <HeaderWeatherUnavailable />;
  }

  return (
    <div
      className="hidden items-center gap-1.5 text-header-muted sm:flex"
      title={weather.title}
    >
      <WeatherLucideIcon icon={weather.icon} main={weather.main} />
      <span className="font-medium tabular-nums">{weather.label}</span>
    </div>
  );
}

export function HeaderWeather() {
  return (
    <Suspense fallback={<HeaderWeatherSkeleton />}>
      <HeaderWeatherContent />
    </Suspense>
  );
}
