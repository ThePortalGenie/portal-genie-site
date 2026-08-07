import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = noIndexPageMetadata({
  title: `About | ${site.title}`,
});

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
    </main>
  );
}
