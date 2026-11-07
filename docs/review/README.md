# Browser review

All screenshots come from a real Chromium browser. Before images show production at baseline `32bb44c`; after images show the real Vercel Preview of application commit `4102319`, with the 18 published Neon projects. No screenshots were generated or composited.

| View                       | Before                       | After                          |
| -------------------------- | ---------------------------- | ------------------------------ |
| Desktop, 1440 × 900, light | [Before](before-desktop.png) | [After](after-desktop.png)     |
| Mobile, 390 × 844, light   | [Before](before-mobile.png)  | [After](after-mobile.png)      |
| Mobile, dark               | —                            | [After](after-mobile-dark.png) |

[PeopleLens desktop case study](peoplelens-desktop.png) · [Handoff Hub mobile case study](handoff-mobile.png)

## Reproduce browser checks

The runner uses Playwright with an installed Chromium browser and axe-core. Install these QA tools in an ignored local folder if they are not available in your environment:

```bash
npm install --prefix work/qa-tools playwright @axe-core/playwright
npm run build
npm run start -- --port 3003
NODE_PATH="$PWD/work/qa-tools/node_modules" CHROME_PATH=/usr/bin/chromium \
  node docs/review/browser-qa.cjs http://127.0.0.1:3003 work/browser-qa
```

It checks search, combined filters, all visible case-study routes, keyboard controls, theme persistence, on-demand previews, image errors, 404 behavior and reduced motion. It captures screenshots and runs WCAG A/AA checks on the homepage and the two detailed engineering studies at 390, 768, 1024 and 1440 pixels in both themes.

Use a production build for end-to-end checks. The managed environment's development HMR websocket failed to connect and prevented client hydration; its development-only results were discarded. The optimized server and Vercel Preview do not depend on that websocket.
