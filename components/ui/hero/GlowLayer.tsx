export function GlowLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {/* Light seems to emanate from behind the dashboard */}
      <div className="absolute left-1/2 top-[24%] size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-portal-blue/18 blur-[100px]" />
      <div className="absolute right-[2%] bottom-[4%] size-[42%] translate-x-1/4 rounded-full bg-portal-teal/14 blur-[90px]" />
      <div className="absolute left-0 bottom-[22%] size-[32%] -translate-x-1/3 rounded-full bg-white/80 blur-[70px]" />
      <div className="absolute left-[12%] top-0 size-[24%] -translate-y-1/3 rounded-full bg-white/50 blur-[60px]" />
    </div>
  );
}
