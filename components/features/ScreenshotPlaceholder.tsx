type ScreenshotPlaceholderProps = {
  label: string;
  aspectRatio?: string;
};

export function ScreenshotPlaceholder({
  label,
  aspectRatio = "16/10",
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className="relative flex w-full items-center justify-center bg-muted/25"
      style={{ aspectRatio }}
      role="img"
      aria-label={label}
    >
      <p className="px-6 text-center text-sm font-medium text-muted">{label}</p>
    </div>
  );
}
