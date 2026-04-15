import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { HeaderCart } from "@/components/header/HeaderCart";
import { HeaderSearch } from "@/components/header/HeaderSearch";
import { HeaderUser } from "@/components/header/HeaderUser";
import { HeaderWeather } from "@/components/header/HeaderWeather";
import { NotificationBar } from "@/components/notification-bar";
import { ResortDropdown } from "@/components/resort-dropdown";
import { getHeaderCached } from "@/lib/server/contentstack-cached";
import { getRequestSiteConfig } from "@/lib/server/request-site";
import type { ResortHeaderData } from "@/lib/types";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type ResortHeaderProps = {
  data: ResortHeaderData;
};

export async function ResortHeader({ data }: ResortHeaderProps) {
  const searchHref = data.search_url ?? "#";
  const site = await getRequestSiteConfig();

  const header = await getHeaderCached(site.brand);
  const otherResorts = header?.other_resort_sites?.[0]?.resort;

  return (
    <>
      <NotificationBar
        announcement_text={header?.notification_bar?.announcement_text ?? ""}
        dismissible={true}
        show={header?.notification_bar?.show_announcement ?? false}
      />
      <header
        className="sticky top-0 z-40 border-header-border border-b bg-header-surface text-header-foreground backdrop-blur-md"
        role="banner"
      >
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <Link className="flex items-center gap-2.5" href="/">
              {data.logo_emblem_url ? (
                <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-header-shine bg-header-emblem-bg">
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
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-header-shine bg-header-emblem-bg font-semibold text-header-muted text-xs"
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
                className={`${script.className} text-2xl text-header-foreground leading-none tracking-wide`}
              >
                {header?.title}
              </span>
            </Link>

            <span
              aria-hidden
              className="hidden h-6 w-px bg-header-shine sm:block"
            />
            <ResortDropdown items={otherResorts} />
          </div>

          <nav
            aria-label="Main"
            className="hidden flex-1 items-center gap-8 font-medium text-header-muted text-sm lg:flex"
          >
            {header?.navigation_menu?.map((link) => (
              <Link
                className="transition hover:text-header-foreground"
                href={link.page_reference[0].url}
                key={`${link.label}-${link.page_reference[0].url}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4 text-sm">
            <HeaderWeather />

            <HeaderSearch
              ariaLabel={data.search_aria_label}
              href={searchHref}
            />

            <span
              aria-hidden
              className="hidden h-6 w-px bg-header-shine sm:block"
            />

            <HeaderUser
              ariaLabel={data.sign_in_label}
              href={data.sign_in_url}
            />

            <span
              aria-hidden
              className="hidden h-6 w-px bg-header-shine sm:block"
            />

            <HeaderCart ariaLabel={data.cart_aria_label} href={data.cart_url} />
          </div>
        </div>
      </header>
    </>
  );
}
