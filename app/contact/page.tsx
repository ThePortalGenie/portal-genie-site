import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = noIndexPageMetadata({
  title: `Contact | ${site.title}`,
});

export default function ContactPage() {
  return (
    <main>
      <h1>Contact</h1>
    </main>
  );
}
