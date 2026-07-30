export function MobileMenuButton() {
  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-button text-portal-navy transition-colors duration-200 hover:bg-background lg:hidden"
      aria-label="Open menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
  );
}
