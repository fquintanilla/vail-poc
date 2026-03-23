import Link from "next/link";

interface HeaderCartProps {
  ariaLabel: string;
  href: string;
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

export function HeaderCart({ ariaLabel, href }: HeaderCartProps) {
  return (
    <Link
      aria-label={ariaLabel}
      className="p-1 text-header-muted hover:text-header-foreground"
      href={href}
    >
      <CartIcon className="size-5" />
    </Link>
  );
}
