import Link from "next/link";

interface HeaderUserProps {
  ariaLabel: string;
  href: string;
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

export function HeaderUser({ ariaLabel, href }: HeaderUserProps) {
  return (
    <Link
      className="hidden items-center gap-2 text-header-muted hover:text-header-foreground sm:flex"
      href={href}
    >
      <UserIcon className="size-5 shrink-0" />
      <span>{ariaLabel}</span>
    </Link>
  );
}
