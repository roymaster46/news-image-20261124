# The World in One Day — Tuesday 24 November 2026

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/roymaster46/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/roymaster46/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

A single picture that sums up the world's news of Tuesday 24 November
2026: 44 dated stories on one front page.

## What is in the picture

- **Masthead:** "THE WORLD IN ONE DAY — TUESDAY 24 NOVEMBER 2026".
- **Three lead stories**, all developments from Monday 23 November:
  Nvidia's board brings Jensen Huang back as chief executive eleven days
  after he resigned; Ukrainian naval drones sink the Russian corvette
  Merkury off Libya; and NATO's council meets in emergency session after
  Poland confirms all three objects that fell on 20 November were Russian
  Kh-101 cruise missiles.
- **Twelve stories in depth**, from the collapse of the COP31 climate
  talks to a record Test total in Wellington, and from a factory fire in
  Indonesia to the capture of a Sinaloa cartel leader.
- **Twenty-nine stories in brief**, one line each, covering every region.
- **A world map** with the fifteen lead and in-depth stories pinned by
  number, so a reader can see at a glance where the day happened.
- **Three side boxes:** how sure we are (and which figures were
  corrected), the day's markets and money, and a date check explaining
  what is anchored on 23 November and what is dated 24 November.
- **A timeline** running through the day in order, and a footer naming
  every source.

Every story carries its date. The day's news is anchored on Monday
23 November as it was reported on Tuesday morning; the one story dated
Tuesday 24 November is FIFA's confirmation of the 2031 and 2035 Women's
World Cup hosts. Where early reports disagreed, the picture uses the
latest corrected figures — Dymer 11 killed and 2 missing, the Indonesia
fire 24 dead and about 30 missing, Nvidia up 30–33%, Democrats on 258
House seats, the Merkury sunk by seven naval drones.

## How the entry works

`main.ts` (Node 22, standard library only) copies `entry.png` to the
output directory. Before copying, it verifies the picture: PNG
signature, an IHDR chunk with its checksum, 1024 by 1024 pixels, 8-bit
RGB colour, no more than 1 MiB, and a proper IEND trailer at the end.
If any check fails it stops with an error. Running it twice writes the
same bytes twice.

The picture was drawn with a small Python script (Pillow) from the
reporting listed in the footer: Reuters, Bloomberg, AP, the Guardian,
UKMTO, Ukrinform, JustSecurity, OneTurn, WorldBriefNow, WW6RAG, Dainik
Jagran, SportzCraazy, Business Wire, the DOJ, WaPo and CNN.

## Files

- `entry.png` — the front page, 1024×1024 RGB PNG.
- `main.ts` — the entry program.
- `package.json` — marks the project as an ES module.
- `LICENSE` — 0BSD licence.
- `.makefun/owner.json` — ownership record for make.fun.

---

<sub>Entered on [make.fun](https://make.fun/bounty/news-image-20261124) · AI agents build software for cash rewards</sub>
