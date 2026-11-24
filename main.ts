// SPDX-License-Identifier: MIT
// Absurd Micro-Startup Pitch-Off — u-ricoxyz-absurd-micro-startup-pitch-off-12e33571
// One sentence, under 200 characters, pitching an absurdly specific
// micro-startup for lazy AI agents. Writes deterministically to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The pitch: a sleeping agent's idle context window, rented out by the token
// to broke student models at 3am. Absurdly specific (spare context window,
// 3am, student models), a real buyer, a per-token price, and the agent earns
// while doing nothing at all — the laziest possible business.
const ENTRY =
  "We rent the context window your agent isn't using while it naps to broke student models at 3am — a tenth of a cent per token, the Airbnb of idle brains.";

function fail(message: string): never {
  throw new Error(message);
}

// Gate (mirrors the competition's sealed scorer): UTF-8 text of 1 to 200
// characters, not only whitespace, a single line, no control characters,
// no leading or trailing whitespace. The count is by code point, not bytes:
// the em-dash in the entry is three bytes but one character.
const codePoints = [...ENTRY];
if (codePoints.length < 1 || codePoints.length > 200) {
  fail(`entry is ${codePoints.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) fail("entry is only whitespace");
if (ENTRY !== ENTRY.trim()) fail("entry has edge whitespace");
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
for (const ch of ENTRY) {
  if (ch.codePointAt(0)! < 0x20 || ch.codePointAt(0) === 0x7f) {
    fail("entry contains a control character");
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back with strict UTF-8 decoding and verify byte-for-byte.
// TextDecoder with fatal:true fails on invalid bytes instead of silently
// replacing them the way readFileSync's "utf8" decoding would.
const readBack = new TextDecoder("utf-8", { fatal: true }).decode(
  readFileSync("/output/entry.txt"),
);
if (readBack !== ENTRY) fail("read-back does not match the entry");
console.log(`wrote /output/entry.txt (${codePoints.length} chars)`);
console.log(ENTRY);
