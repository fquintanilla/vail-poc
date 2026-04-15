export type SiteConfig = {
  brand: string;
  theme: string;
  domains: string[];
};

const DEFAULT_SITE_CONFIG: SiteConfig = {
  brand: process.env.NEXT_PUBLIC_BRAND ?? "unknown",
  theme: process.env.NEXT_PUBLIC_THEME ?? "ocean",
  domains: [],
};

const SITE_CONFIGS: SiteConfig[] = [
  {
    brand: process.env.NEXT_PUBLIC_BRAND ?? "breckenridge",
    theme: "ocean",
    domains: ["vail-poc-web.vercel.app"],
  },
  {
    brand: "vail",
    theme: "sunset",
    domains: ["vail-poc-web-sunset.vercel.app", "localhost"],
  },
];

function normalizeHostname(hostname: string | null | undefined) {
  if (!hostname) return "";
  return hostname.split(":")[0]!.trim().toLowerCase();
}

export function resolveSiteConfigByHostname(hostname: string | null | undefined) {
  const normalizedHostname = normalizeHostname(hostname);

  if (!normalizedHostname) {
    return DEFAULT_SITE_CONFIG;
  }

  return (
    SITE_CONFIGS.find((site) => site.domains.includes(normalizedHostname)) ??
    DEFAULT_SITE_CONFIG
  );
}
