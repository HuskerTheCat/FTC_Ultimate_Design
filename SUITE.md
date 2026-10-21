# FTC Ultimate suite notes

The FTC Ultimate apps, Design, [Inventory](https://github.com/HuskerTheCat/FTC_Ultimate_Inventory) and [Scout](https://github.com/HuskerTheCat/FTC_Ultimate_Scout), share one Firebase project per team. This file lists what they share and logs changes that affect the other apps. Read the other apps' `SUITE.md` before changing anything below, and add a dated line to every app's file when you do.

## Shared

- **Firebase project**: one per team, set up once from any app.
- **Accounts**: the project's Firebase Auth, email and password.
- **Team docs**: `team/info`, `team/owner`, `join/info`, `members/{uid}`. Same shapes and join flow in every app.
- **Join codes**: `<projectId>-<secret>`, link `#join=<code>`. Sign in by team number through the hub's `teams/{key}`.
- **Rules**: one `firestore.rules`, identical in every app's repo, since publishing replaces the whole file. Each app checks its own version number: Inventory `rulesVersion()`, Scout `scoutRulesVersion()`, Design `designRulesVersion()`.
- **Hub**: `ultimate-inventory-hub` (`hub.rules` in Inventory's repo). Team-level data only, never anything about a person.
- **Collection names**: Inventory's are unprefixed; Scout's start with `scout`, Design's with `design`.
- **Device storage**: every website shares `huskerthecat.github.io`. Design uses `ftc-design-*` keys and starts Firebase as the named app `design`.
- **Brand**: the split cube logo (Inventory blue, Scout orange, Design green), Orbitron for names, the topo background.

## Changes

- 2026-10-18: Design started with Inventory's team, join and hub code (Scout's version). Combined `firestore.rules`: Inventory's rules unchanged (version 5), Scout's section unchanged (`scoutRulesVersion` 1), plus Design's section (`designRulesVersion` 1, only `designRulesVersion/{version}` so far). Inventory's and Scout's repos don't have Design's section yet.
- 2026-10-18: Home page: the line between Sign in and Join code is now exactly centered (it was 6px right of center). CSS only (`.split` in `src/style.css`, computers and tablets block). Same fix made in Inventory, Scout and Design.
- 2026-10-20: Topographic background: new smooth `src/topo.svg` (1200x2400 seamless tile, repeats down the page) and the lines drift at exactly 30% of the scroll speed, pure CSS (scroll-driven animation on `body::after` with `will-change: transform`; gradient is a fixed `100lvh` layer; still when reduced motion is on). CSS and `topo.svg` only (`src/style.css`, "first screens sit on the topographic map" block). Same change in Inventory, Scout and Design; Inventory also glides to guide sections.
- 2026-10-21: App switcher: the home page's cube is a button (`#apps-toggle`) opening a menu "FTC Ultimate" with Inventory, Scout and Design, each with its cube (the other two apps' `public/icon.svg` copied into `src/`). The current app is highlighted; the others link to `https://huskerthecat.github.io/FTC_Ultimate_<App>/`. Inventory has the same menu on its home page and main screen, and on Windows and Android opens the installed app instead (scheme `ftc-ultimate-<app>`, package id `io.github.huskerthecat.ftc<app>`; see Inventory's SUITE.md). Give Design's Windows and Android apps the same when they are built.
- 2026-10-21: Look matches Inventory: body font is **Saira** (was Barlow; `@fontsource/saira` in `src/style.css`). The app switcher says **Competition** and links to `https://huskerthecat.github.io/FTC_Ultimate_Competition/` (`src/competition.svg` replaces `src/scout.svg`), and the menu is in Orbitron with each app in its color (Inventory blue, Competition orange, Design green; darker shades in light mode). No data change.
