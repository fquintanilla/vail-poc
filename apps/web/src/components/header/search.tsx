import Link from "next/link";

interface HeaderSearchProps {
  ariaLabel: string;
  href: string;
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

export function HeaderSearch({ ariaLabel, href }: HeaderSearchProps) {
  return (
    <Link
      aria-label={ariaLabel}
      className="p-1 text-header-muted hover:text-header-foreground"
      href={href}
    >
      <SearchIcon className="size-5" />
    </Link>
  );
}
