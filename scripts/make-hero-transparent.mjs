import sharp from "sharp";
import path from "node:path";

const srcPath = path.resolve(
  "assets/source-images/hero-connected-experience-original.png"
);
const outPath = path.resolve(
  "public/images/product/marketing/hero-connected-experience-transparent.png"
);

// Below this raw "unscreen" alpha, treat as fully transparent — the source
// has faint global noise/vignette so without a floor + rescale, huge empty
// regions carry alpha 1-10, which is invisible for colour blending but
// still registers in a CSS drop-shadow's silhouette, producing a faint
// rectangular halo. Clamping + rescaling above the floor keeps the glow's
// soft falloff while eliminating that box artifact.
const ALPHA_FLOOR = 24;

const img = sharp(srcPath).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const out = Buffer.alloc(width * height * 4);

for (let i = 0; i < width * height; i++) {
  const srcIdx = i * channels;
  const r = data[srcIdx];
  const g = data[srcIdx + 1];
  const b = data[srcIdx + 2];

  const minChannel = Math.min(r, g, b);
  const rawAlpha = 255 - minChannel;
  const alpha =
    rawAlpha <= ALPHA_FLOOR
      ? 0
      : Math.round(((rawAlpha - ALPHA_FLOOR) * 255) / (255 - ALPHA_FLOOR));

  const dstIdx = i * 4;
  if (alpha <= 0) {
    out[dstIdx] = 0;
    out[dstIdx + 1] = 0;
    out[dstIdx + 2] = 0;
    out[dstIdx + 3] = 0;
    continue;
  }

  const newR = Math.min(255, Math.max(0, Math.round(((r - minChannel) * 255) / rawAlpha)));
  const newG = Math.min(255, Math.max(0, Math.round(((g - minChannel) * 255) / rawAlpha)));
  const newB = Math.min(255, Math.max(0, Math.round(((b - minChannel) * 255) / rawAlpha)));

  out[dstIdx] = newR;
  out[dstIdx + 1] = newG;
  out[dstIdx + 2] = newB;
  out[dstIdx + 3] = alpha;
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(outPath);

console.log("wrote", outPath);
