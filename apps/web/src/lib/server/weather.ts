import { cacheLife, cacheTag } from "next/cache";

const WEATHER_LAT = "39.6428919";
const WEATHER_LON = "-106.4342569";

export type HeaderWeatherData =
  | { available: false }
  | {
      available: true;
      label: string;
      title: string;
      icon: string;
      main: string;
    };

function fromOpenWeatherJson(data: unknown): HeaderWeatherData {
  if (typeof data !== "object" || data === null) {
    return { available: false };
  }
  const o = data as {
    main?: { temp?: unknown };
    weather?: Array<{
      icon?: string;
      main?: string;
      description?: string;
    }>;
    name?: string;
  };
  const temp = o.main?.temp;
  const w0 = o.weather?.[0];
  if (typeof temp !== "number" || !w0?.icon || !w0.main) {
    return { available: false };
  }
  const place = o.name ?? "";
  const title =
    [w0.description, place].filter(Boolean).join(" · ") || "Weather";
  return {
    available: true,
    label: `${Math.round(temp)}°F`,
    title,
    icon: w0.icon,
    main: w0.main,
  };
}

export async function getWeather(): Promise<HeaderWeatherData> {
  "use cache";
  cacheLife("weather");
  cacheTag("weather-current");

  console.log("DEBUG:getWeather");

  const apiKey = process.env.OPENWEATHER_API_KEY?.trim();
  if (!apiKey) {
    console.log("DEBUG:getWeather:no api key");
    return { available: false };
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", WEATHER_LAT);
  url.searchParams.set("lon", WEATHER_LON);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "imperial");

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data: unknown = await res.json();

  if (!res.ok) {
    return { available: false };
  }

  return fromOpenWeatherJson(data);
}
