// news-image-20261124 — entry program.
//
// What it does: it takes the finished front page that ships with this
// repository (entry.png) and writes an identical copy to the output
// directory the harness points at with MAKEFUN_OUTPUT_DIR.
//
// The picture itself was drawn ahead of time, with a small Python script,
// from the day's reporting: 44 dated stories from Monday 23 November 2026
// (as reported on Tuesday morning) plus one story dated Tuesday 24 November
// (FIFA). Nothing is fetched here — the program runs with no network — so
// running it twice writes the same bytes twice.
//
// Before copying, it checks the picture is really what it claims to be:
// a PNG (magic bytes), 1024 by 1024 pixels, RGB colour, and no bigger than
// 1 MiB. If any of those checks fails it stops with an error instead of
// writing a broken file.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// A small CRC-32 (the one PNG uses) so the header and trailer checks
// below can confirm the chunk checksums, not just the chunk names.
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_BYTES = 1024 * 1024;
const SOURCE = new URL("./entry.png", import.meta.url);

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const bytes = readFileSync(SOURCE);

// 1. It must start with the PNG signature.
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file");
}

// 2. The first chunk must be IHDR, and it must say 1024 x 1024.
const ihdrLength = bytes.readUInt32BE(8);
const ihdrType = bytes.subarray(12, 16).toString("latin1");
if (ihdrType !== "IHDR" || ihdrLength !== 13) {
  throw new Error("entry.png has no valid IHDR chunk");
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
const bitDepth = bytes[24];
const colourType = bytes[25];
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}
if (bitDepth !== 8 || colourType !== 2) {
  throw new Error(`entry.png is not 8-bit RGB (depth ${bitDepth}, type ${colourType})`);
}

// 2b. The IHDR checksum must match, so a corrupted header is caught.
const ihdrStoredCrc = bytes.readUInt32BE(29);
const ihdrComputedCrc = crc32(bytes.subarray(12, 29));
if (ihdrStoredCrc !== ihdrComputedCrc) {
  throw new Error("entry.png has a bad IHDR checksum");
}

// 3. It must fit the 1 MiB limit.
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

// 3b. The file must end with a proper IEND trailer, so a truncated
// file is caught instead of copied.
const tail = bytes.subarray(bytes.length - 12);
if (tail.readUInt32BE(0) !== 0 || tail.subarray(4, 8).toString("latin1") !== "IEND") {
  throw new Error("entry.png has no IEND trailer (file may be truncated)");
}
if (tail.readUInt32BE(8) !== 0xae426082) {
  throw new Error("entry.png has a bad IEND checksum");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(SOURCE, target);

// 4. The copy must be byte-for-byte the same as the source.
if (statSync(target).size !== bytes.length) {
  throw new Error("copied entry.png has the wrong size");
}
if (!readFileSync(target).equals(bytes)) {
  throw new Error("copied entry.png differs from the source");
}

console.log(`wrote ${target} (${bytes.length} bytes, 1024x1024 RGB PNG)`);
