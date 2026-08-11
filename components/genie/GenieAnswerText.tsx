import Link from "next/link";
import type { ReactNode } from "react";
import { isSafeInternalPath } from "@/lib/genie/safe-internal-path";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const BOLD = /\*\*([^*]+)\*\*/g;
const PLAIN_PATH = /(?<![\w/.])(\/[\w-]+(?:\/[\w-]+)*(?:#[\w-]+)?)(?![\w/.])/g;

function parseBold(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of text.matchAll(BOLD)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }
    parts.push(
      <strong key={`${keyPrefix}-b-${matchIndex}`} className="font-semibold">
        {match[1]}
      </strong>,
    );
    lastIndex = index + match[0].length;
    matchIndex += 1;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function parsePlainPaths(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of text.matchAll(PLAIN_PATH)) {
    const path = match[1];
    const index = match.index ?? 0;

    if (!isSafeInternalPath(path)) {
      continue;
    }

    if (index > lastIndex) {
      parts.push(...flattenTextSegment(text.slice(lastIndex, index), `${keyPrefix}-t-${matchIndex}`));
    }

    parts.push(
      <Link
        key={`${keyPrefix}-p-${matchIndex}`}
        href={path}
        className="font-medium text-portal-blue underline decoration-portal-blue/30 underline-offset-2 hover:decoration-portal-blue"
      >
        {path}
      </Link>,
    );

    lastIndex = index + path.length;
    matchIndex += 1;
  }

  if (lastIndex < text.length) {
    parts.push(...flattenTextSegment(text.slice(lastIndex), `${keyPrefix}-tail`));
  }

  return parts.length > 0 ? parts : flattenTextSegment(text, `${keyPrefix}-full`);
}

function flattenTextSegment(text: string, keyPrefix: string): ReactNode[] {
  return parseBold(text, keyPrefix);
}

function renderSegment(text: string, keyPrefix: string): ReactNode[] {
  return parsePlainPaths(text, keyPrefix);
}

/** Safely renders Genie answer text with paragraphs, bold, and internal links only. */
export function GenieAnswerText({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/);

  return (
    <div className="space-y-3 text-sm leading-relaxed text-portal-navy/90">
      {paragraphs.map((paragraph, paragraphIndex) => {
        const lines = paragraph.split("\n");

        return (
          <p key={`p-${paragraphIndex}`}>
            {lines.map((line, lineIndex) => {
              const segments = renderSegment(line, `p${paragraphIndex}-l${lineIndex}`);
              const lineKey = `p${paragraphIndex}-l${lineIndex}`;

              return (
                <span key={lineKey}>
                  {lineIndex > 0 ? <br /> : null}
                  {segments.map((segment, segmentIndex) => (
                    <span key={`${lineKey}-s${segmentIndex}`}>{segment}</span>
                  ))}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

/** Parses markdown-style links first, then plain paths and bold in remaining text. */
export function GenieAnswerTextWithMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let lastIndex = 0;
  let blockIndex = 0;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0;
    const label = match[1];
    const href = match[2].trim();

    if (index > lastIndex) {
      blocks.push(
        <GenieAnswerText
          key={`pre-${blockIndex}`}
          text={text.slice(lastIndex, index)}
        />,
      );
      blockIndex += 1;
    }

    if (isSafeInternalPath(href)) {
      blocks.push(
        <Link
          key={`link-${blockIndex}`}
          href={href}
          className="font-medium text-portal-blue underline decoration-portal-blue/30 underline-offset-2 hover:decoration-portal-blue"
        >
          {label}
        </Link>,
      );
    } else {
      blocks.push(<span key={`link-${blockIndex}`}>{label}</span>);
    }

    lastIndex = index + match[0].length;
    blockIndex += 1;
  }

  if (lastIndex < text.length) {
    blocks.push(
      <GenieAnswerText key={`post-${blockIndex}`} text={text.slice(lastIndex)} />,
    );
  }

  if (blocks.length === 0) {
    return <GenieAnswerText text={text} />;
  }

  return <div className="space-y-3">{blocks}</div>;
}
