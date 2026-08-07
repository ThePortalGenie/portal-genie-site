/**
 * One-off Sprint 3B image optimisation — creates WebP derivatives alongside
 * originals. Run: node scripts/optimize-sprint3b-images.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public");

/** @type {Array<{ src: string; outDir: string; outName: string; webpQuality: number; maxWidth?: number }>} */
const jobs = [
  {
    src: "images/product/marketing/customer-portal.png",
    outDir: "images/product/marketing/optimized",
    outName: "customer-portal.webp",
    webpQuality: 90,
  },
  {
    src: "images/product/marketing/platform-overview-dashboard.png",
    outDir: "images/product/marketing/optimized",
    outName: "platform-overview-dashboard.webp",
    webpQuality: 90,
  },
  {
    src: "images/product/marketing/payments-dashboard.png",
    outDir: "images/product/marketing/optimized",
    outName: "payments-dashboard.webp",
    webpQuality: 90,
  },
  {
    src: "images/product/marketing/document-management-admin-client-portal.png",
    outDir: "images/product/marketing/optimized",
    outName: "document-management-admin-client-portal.webp",
    webpQuality: 90,
  },
  {
    src: "images/features/customer-communication-note-history.png",
    outDir: "images/features/optimized",
    outName: "customer-communication-note-history.webp",
    webpQuality: 90,
  },
  {
    src: "images/logos/xero-connected-app-badge.png",
    outDir: "images/logos/optimized",
    outName: "xero-connected-app-badge.webp",
    webpQuality: 95,
    maxWidth: 512,
  },
  {
    src: "images/logos/African Techno Logo.png",
    outDir: "images/logos/optimized",
    outName: "african-techno-logo.webp",
    webpQuality: 90,
    maxWidth: 400,
  },
  {
    src: "images/logos/Myccountant_Logo-01.jpg",
    outDir: "images/logos/optimized",
    outName: "myccountant-logo.webp",
    webpQuality: 90,
    maxWidth: 400,
  },
  {
    src: "images/logos/Sourcing Logo Real Big.jpg",
    outDir: "images/logos/optimized",
    outName: "sourcing-logo.webp",
    webpQuality: 90,
    maxWidth: 400,
  },
  {
    src: "images/logos/Freed Logo2.png",
    outDir: "images/logos/optimized",
    outName: "freed-logo.webp",
    webpQuality: 90,
    maxWidth: 400,
  },
  {
    src: "images/logos/JBM_Logo.png",
    outDir: "images/logos/optimized",
    outName: "jbm-logo.webp",
    webpQuality: 90,
    maxWidth: 400,
  },
];

const results = [];

for (const job of jobs) {
  const inputPath = path.join(root, job.src);
  const outputDir = path.join(root, job.outDir);
  const outputPath = path.join(outputDir, job.outName);

  await mkdir(outputDir, { recursive: true });

  let pipeline = sharp(inputPath);
  if (job.maxWidth) {
    pipeline = pipeline.resize({
      width: job.maxWidth,
      withoutEnlargement: true,
    });
  }

  const inputMeta = await sharp(inputPath).metadata();
  const inputStat = await import("node:fs/promises").then((fs) =>
    fs.stat(inputPath),
  );

  await pipeline
    .webp({ quality: job.webpQuality, effort: 6 })
    .toFile(outputPath);

  const outputStat = await import("node:fs/promises").then((fs) =>
    fs.stat(outputPath),
  );

  results.push({
    src: job.src,
    output: `/${job.outDir}/${job.outName}`.replace(/\\/g, "/"),
    dimensions: `${inputMeta.width}x${inputMeta.height}`,
    beforeKB: Math.round(inputStat.size / 1024),
    afterKB: Math.round(outputStat.size / 1024),
  });
}

console.log(JSON.stringify(results, null, 2));
