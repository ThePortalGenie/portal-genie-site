import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  markdown: string;
};

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight text-portal-navy first:mt-0 sm:text-[1.75rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight text-portal-navy">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-relaxed text-portal-navy/80 sm:text-lg sm:leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-portal-navy/80 sm:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-portal-navy/80 sm:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-portal-navy">{children}</strong>
  ),
  em: ({ children }) => <em>{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-portal-blue/30 pl-4 text-base leading-relaxed text-portal-navy/75 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-muted/20 px-1.5 py-0.5 font-mono text-sm text-portal-navy">
      {children}
    </code>
  ),
  a: ({ href, children }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    const className =
      "font-medium text-portal-blue underline-offset-2 transition-colors duration-200 hover:text-portal-blue/80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-blue";

    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  },
};

/** Renders knowledge article Markdown with conservative, site-appropriate styling. */
export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <div className="max-w-prose">
      <ReactMarkdown components={markdownComponents}>{markdown}</ReactMarkdown>
    </div>
  );
}
