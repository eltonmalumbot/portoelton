# Project cover provenance

Existing AVIF/WebP documentation and source-based SVG process artwork remain unchanged. Source-based artwork is identified in alternative text and case-study captions; it is not presented as application UI.

The following covers are unmodified JPEG captures from a real headless Chromium browser, at 1280 × 800, using the public unauthenticated pages. No UI, data, or screenshot content was invented. They are historical captures, not current live-state guarantees. Live preview and demo links remain available.

| File                                              | Public source                     | Capture (UTC)            | HTTP |
| ------------------------------------------------- | --------------------------------- | ------------------------ | ---- |
| `public/projects/cariskolah/live-capture.jpg`     | https://cariskolah.vercel.app/    | 2026-11-07T07:01:02.379Z | 200  |
| `public/projects/pindailoker/live-capture.jpg`    | https://pindailoker.vercel.app/   | 2026-11-07T07:01:07.244Z | 200  |
| `public/projects/prankjessica/live-capture.jpg`   | https://prankjessica.vercel.app/  | 2026-11-07T07:01:11.574Z | 200  |
| `public/projects/evergreen-life/live-capture.jpg` | https://elton-farming.vercel.app/ | 2026-11-07T07:01:16.029Z | 200  |
| `public/projects/penaburcombat/live-capture.jpg`  | https://penaburcombat.vercel.app/ | 2026-11-07T07:01:21.231Z | 200  |

The two `public/projects/supertools/*.webp` files on the baseline were not decodable image files. Restored the real, previously committed images from commit `d31e85a`; the recovered originals are lower resolution (360px wide) and are not reconstructed or upscaled source files. Both were visually inspected before restoration. Two legacy SVG files also contained unescaped ampersands; those XML errors were corrected without changing their artwork.
