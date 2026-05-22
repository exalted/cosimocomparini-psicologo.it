#!/usr/bin/env node
/*
 * Optimize large photos for the web.
 *
 * Resizes each listed photo to fit within MAX x MAX pixels and writes both a
 * compressed JPEG (overwriting the original) and a WebP sibling. The original
 * camera-resolution files (~4000px, 1-2 MB each) are far larger than they are
 * ever displayed; the old versions remain recoverable from git history.
 *
 * Run manually after adding or replacing a photo (it is NOT part of the CI
 * build):
 *
 *     node script/optimize-images.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_DIR = path.join(ROOT, "assets", "img");

const MAX = 1600; // longest edge, in pixels
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 78;

const targets = [
  "cesena-1.jpg",
  "cesena-2.jpg",
  "cesena-3.jpg",
  "gambettola-1.jpg",
  "gambettola-2.jpg",
  "gambettola-3.jpg",
  "chi-sono.jpg",
];

for (const file of targets) {
  const src = path.join(IMG_DIR, file);
  const base = file.replace(/\.jpe?g$/i, "");

  // Read + transform fully into buffers first, so we can safely overwrite the
  // source file (sharp cannot stream from and to the same path).
  const pipeline = sharp(src)
    .rotate() // bake in EXIF orientation, then strip metadata
    .resize(MAX, MAX, { fit: "inside", withoutEnlargement: true });

  const jpgBuf = await pipeline
    .clone()
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
  const webpBuf = await pipeline.clone().webp({ quality: WEBP_QUALITY }).toBuffer();

  const { width, height } = await sharp(jpgBuf).metadata();
  await sharp(jpgBuf).toFile(path.join(IMG_DIR, `${base}.jpg`));
  await sharp(webpBuf).toFile(path.join(IMG_DIR, `${base}.webp`));

  const kb = (n) => `${Math.round(n / 1024)} KB`;
  console.log(
    `${file.padEnd(20)} ${width}x${height}   jpg ${kb(jpgBuf.length)}   webp ${kb(webpBuf.length)}`,
  );
}
