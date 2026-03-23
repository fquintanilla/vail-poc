import type { LucideIcon } from 'lucide-react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
} from 'lucide-react';

export const weatherHeaderIconClass = 'size-5 shrink-0 text-header-weather';

/** OpenWeather `icon` first two chars (01d, 04n, …); see https://openweathermap.org/weather-conditions */
const ICON_BY_CODE: Record<string, LucideIcon> = {
  '02': CloudSun,
  '03': Cloud,
  '04': Cloud,
  '09': CloudRain,
  '10': CloudRain,
  '11': CloudLightning,
  '13': Snowflake,
  '50': CloudFog,
};

const MAIN_FALLBACK: Array<{
  match: (m: string) => boolean;
  Icon: LucideIcon;
}> = [
  { match: (m) => m.includes('thunder'), Icon: CloudLightning },
  { match: (m) => m.includes('drizzle'), Icon: CloudDrizzle },
  { match: (m) => m.includes('rain'), Icon: CloudRain },
  { match: (m) => m.includes('snow'), Icon: Snowflake },
  {
    match: (m) => m.includes('mist') || m.includes('fog') || m.includes('haze'),
    Icon: CloudFog,
  },
];

export function WeatherLucideIcon({
  icon,
  main,
}: {
  icon?: string;
  main?: string;
}) {
  const code = icon?.slice(0, 2) ?? '';
  const isNight = Boolean(icon?.endsWith('n'));

  if (code === '01') {
    const C = isNight ? Moon : Sun;
    return <C aria-hidden className={weatherHeaderIconClass} strokeWidth={2} />;
  }

  const CodeIcon = ICON_BY_CODE[code];
  if (CodeIcon) {
    return (
      <CodeIcon
        aria-hidden
        className={weatherHeaderIconClass}
        strokeWidth={2}
      />
    );
  }

  const m = main?.toLowerCase() ?? '';
  for (const { match, Icon } of MAIN_FALLBACK) {
    if (match(m)) {
      return (
        <Icon aria-hidden className={weatherHeaderIconClass} strokeWidth={2} />
      );
    }
  }

  if (m === 'clear') {
    const C = isNight ? Moon : Sun;
    return <C aria-hidden className={weatherHeaderIconClass} strokeWidth={2} />;
  }

  return (
    <Cloud aria-hidden className={weatherHeaderIconClass} strokeWidth={2} />
  );
}
