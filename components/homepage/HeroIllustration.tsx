import Image from "next/image";
import { homepage } from "@/content/homepage";

export function HeroIllustration() {
  const { illustration } = homepage.hero;

  return (
    <Image
      src={illustration.src}
      alt={illustration.alt}
      width={1672}
      height={941}
      quality={90}
      priority
      className="h-auto w-full max-w-[650px]"
      sizes="(max-width: 1024px) 100vw, 650px"
    />
  );
}
