import { getHeaderCached } from "@/lib/server/contentstack-cached";
import type { ResortHeaderData } from "@/lib/types";
import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { NotificationBar } from "./notification-bar";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type ResortHeaderProps = {
  data: ResortHeaderData;
};

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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function ResortHeader({ data }: ResortHeaderProps) {
  const searchHref = data.search_url ?? "#";

  const header = await getHeaderCached();

  return (
    <>
      <NotificationBar
        show={header?.notification_bar?.show_announcement ?? false}
        announcement_text={header?.notification_bar?.announcement_text ?? ""}
      />
      <header
        className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/85 text-white backdrop-blur-md"
        role="banner"
      >
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <Link className="flex items-center gap-2.5" href="/">
              {data.logo_emblem_url ? (
                <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/25 bg-white/10">
                  <Image
                    alt={data.logo_emblem_alt}
                    className="object-cover"
                    fill
                    sizes="36px"
                    src={data.logo_emblem_url}
                  />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xs font-semibold text-white/90"
                >
                  {header?.title
                    .split(/\s+/)
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
              <span
                className={`${script.className} text-2xl leading-none tracking-wide text-white`}
              >
                {header?.title}
              </span>
            </Link>
            <span
              aria-hidden
              className="hidden h-6 w-px bg-white/25 sm:block"
            />
            {data.show_resort_dropdown ? (
              <button
                aria-expanded={false}
                aria-haspopup="true"
                aria-label="Resort menu"
                className="hidden items-center gap-1 text-white/80 hover:text-white sm:flex"
                type="button"
              >
                <ChevronDownIcon className="size-4" />
              </button>
            ) : null}
          </div>

          <nav
            aria-label="Main"
            className="hidden flex-1 items-center gap-8 text-sm font-medium text-white/90 lg:flex"
          >
            {header?.navigation_menu?.map((link) => (
              <Link
                className="transition hover:text-white"
                href={link.page_reference[0].url}
                key={`${link.label}-${link.page_reference[0].url}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4 text-sm">
            <div
              className="hidden items-center gap-1.5 text-white/90 sm:flex"
              title="Weather"
            >
              <SunIcon className="size-5 shrink-0 text-amber-300" />
              <span className="font-medium tabular-nums">
                {data.weather_temperature_text}
              </span>
            </div>

            <Link
              aria-label={data.search_aria_label}
              className="p-1 text-white/90 hover:text-white"
              href={searchHref}
            >
              <SearchIcon className="size-5" />
            </Link>

            <span
              aria-hidden
              className="hidden h-6 w-px bg-white/25 sm:block"
            />

            <Link
              className="hidden items-center gap-2 text-white/90 hover:text-white sm:flex"
              href={data.sign_in_url}
            >
              <UserIcon className="size-5 shrink-0" />
              <span>{data.sign_in_label}</span>
            </Link>

            <span
              aria-hidden
              className="hidden h-6 w-px bg-white/25 sm:block"
            />

            <Link
              aria-label={data.cart_aria_label}
              className="p-1 text-white/90 hover:text-white"
              href={data.cart_url}
            >
              <CartIcon className="size-5" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
