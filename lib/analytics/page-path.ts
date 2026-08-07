/** Current pathname for analytics (client-only). */
export function getCurrentPagePath(): string {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}
