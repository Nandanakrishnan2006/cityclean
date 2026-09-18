# CityCleanMap

**Map It. Report It. Clean It.**

A community-first waste reporting platform for Bhimavaram, Andhra Pradesh. Citizens pin
garbage hotspots on a live map, filter them by severity, join clean-up drives, and watch the
neighbourhood's impact grow — all from a single immersive, 3D-styled page.

> Live demo: https://citycleanmap.lovable.app

---

## The problem

Waste in public spaces usually gets reported by phone call, if at all. By then the pile has
spread, the bin has overflowed onto the road, and nobody knows exactly where the problem is.
Municipal teams end up routing collection trucks on guesswork instead of data.

## The idea

Turn every citizen into a sensor. A report takes under a minute: name, location, waste type,
severity. It lands on a shared map with real coordinates, so hotspots become visible, easy to
prioritise, and measurable.

---

## Features

| | |
| --- | --- |
| 🗺️ **Live hotspot map** | Leaflet + OpenStreetMap tiles centred on Bhimavaram, with colour-coded markers for critical, moderate, and resolved reports. Click a marker for the area, waste type, and severity. |
| 🎚️ **Severity filters** | One-tap chips to show all reports or isolate critical, moderate, or resolved ones — with a live count of what's on screen. |
| 📝 **Report form** | Name, contact, specific location, waste type, severity toggle, and description. Validates required fields and confirms the submission inline. |
| ♻️ **Recycling guide** | What goes in each bin, plus the colour-coding standard (green wet, blue dry, red hazardous). |
| 🤝 **Clean-up drives** | Upcoming volunteer events with a capacity progress bar and a join action. |
| 📈 **Impact counters** | Reports, resolutions, tonnes collected, and volunteers animate up as the section scrolls into view. |
| ✨ **Immersive UI** | Parallax hero with a floating 3D city model, perspective grid floor, glassmorphism panels, and depth cards that respond to scroll. |

## Tech stack

- **[TanStack Start](https://tanstack.com/start)** — React 19 full-stack framework with file-based routing, SSR, and route-level `<head>` metadata
- **[TypeScript](https://www.typescriptlang.org/)** — typed report and severity models
- **[Tailwind CSS v4](https://tailwindcss.com/)** — design tokens, glass and depth utilities, theme variables
- **[Leaflet](https://leafletjs.com/)** — the interactive map, lazy-loaded in the browser only
- **[OpenStreetMap](https://www.openstreetmap.org/)** — map tiles and attribution
- **[Vite 8](https://vite.dev/)** — dev server and build

## Quick start

You need Node.js 20+ and npm.

```sh
git clone <this-repository-url>
cd citycleanmap
npm install
npm run dev
```

Open http://localhost:8080 and you'll have the full page running.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run format` | Format files with Prettier |

## Project structure

```text
src/
├── assets/hero-city.png          # 3D city model used in the hero
├── components/site/
│   └── MapPanel.tsx              # Leaflet map, severity filters, legend
├── data/city.ts                  # Reports, stats, events, recycling + impact data
├── routes/
│   ├── __root.tsx                # App shell, fonts, global metadata
│   └── index.tsx                 # Hero, why, map, report, recycle, events, impact
├── styles.css                    # Tailwind v4 theme tokens and 3D utilities
├── router.tsx
└── start.ts
```

### Working with the data

Everything the page shows comes from `src/data/city.ts`:

- `reports` — the hotspots plotted on the map. Add an entry with a `lat`, `lng`, `severity`
  (`critical` | `moderate` | `resolved`), `area`, `type`, and `title` and it appears as a marker.
- `stats` and `impact` — the numbers in the hero cards and the animated counters.
- `events` — clean-up drives, including `joined` and `capacity` for the progress bar.
- `problems` and `recyclables` — the "why" and "how to recycle" cards.

`BHIMAVARAM` holds the default map centre; change it to point the map elsewhere.

## Current state and what's next

This is a working front-end prototype. The report form validates and confirms submissions in
the browser, and the map renders the reports held in `src/data/city.ts`. Persisting reports,
accounts, and municipal dashboards are the natural next layer.

Roadmap:

- [ ] Save reports to a database and render real submissions on the map
- [ ] Photo attachment and geolocation capture at report time
- [ ] Citizen logins and report status tracking
- [ ] Municipal view: assign, update, and close reports
- [ ] Clustered markers and a heatmap layer for dense areas
- [ ] Route optimisation for collection vehicles from live hotspot data

## Contributing

Contributions are welcome. Fork the repo, create a branch for your change, run `npm run lint`
before committing, and open a pull request describing what changed and why.

For larger ideas — a new data model, an authentication layer, a second city — please open an
issue first so the approach can be agreed before code is written.

## Acknowledgements

- [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors for the map tiles
- The volunteers and residents of Bhimavaram reporting problems on the ground

---

Built as a civic-tech prototype. Map It. Report It. Clean It.
