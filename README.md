# Mogadishu Flood Risk — Story Map (Draft)

An initial, brandable MapLibre story map built on the Digital Democracy
storytelling template, carrying the **approved v4 narrative** and the **Triple
Line brand**. This draft is for client (World Bank) review of the narrative,
structure, and look and feel. The flood/survey map layers are scaffolded but not
yet loaded, because the source GIS data has not been provided.

## What's in this folder
```
index.html                 Branded template (Triple Line CSS + deep-dive callouts)
config.js                  The 10 narrative chapters + 3 deep-dive boxes + camera positions
sources.js                 Layer scaffold for the flood/survey data (commented, ready to activate)
fonts/                     Self-hosted Libre Franklin (Franklin Gothic web stand-in) — done
images/                    Starter images (cover placeholder, Triple Line logo)
map/                       Web tiles go here (empty until GIS data is tiled)
data/                      Put source GIS here + prepare_layers.sh to clip & tile
```

## How to preview it
This draft plugs into your existing forked `maplibre-storymap` repository, which
already contains the `dist/` bundle the template needs.

1. Copy `index.html`, `config.js`, `sources.js` and the `fonts/` folder into your
   forked repo (replacing the existing `index.html`, `config.js`, `sources.js`).
2. From the repo folder, start a local server and open it:
   ```
   python3 -m http.server 8000
   # then browse to http://localhost:8000
   ```
3. Scroll. You should see the ten chapters flying around Mogadishu over a
   key-free OpenFreeMap basemap, with the three deep-dive boxes expanding on click.

(If you are not using your fork, clone the template first so you have `dist/`:
`git clone https://github.com/digidem/maplibre-storymap` and copy these files in.)

## What is DONE in this draft
- Full approved narrative, as 10 chapters, in reading order.
- The 3 deep-dive boxes as branded, click-to-expand callouts.
- Triple Line brand coded in: Libre Franklin (Franklin Gothic stand-in),
  teal `#00797E` headings, orange `#F78D2A` accents, slate `#313E48` body.
- Key-free, no-account basemap (OpenFreeMap) — the handover-safe choice.
- Self-hosted fonts — no Google Fonts / third-party dependency.

## What is PLACEHOLDER / still to do
- **Map data layers.** The flood extents, retention ponds, exposed buildings,
  survey points and expansion areas are NOT yet on the map. Provide the GIS data
  (see `data/README.md`), run `data/prepare_layers.sh`, then activate the layers
  in `sources.js` and add per-chapter fade-ins in `config.js`.
- **Camera positions.** The `location:` values in `config.js` are approximate
  placeholders for Mogadishu; refine them against the real AOI and flood layers.
- **Chapter images.** No photographs/figures are embedded yet; add de-identified
  images to `images/` and reference them per chapter if wanted.
- **Warta Nabada + district framing.** Exact coordinates for named features
  should be set once the pond/boundary layers are in.

## Handover reminders (consistent with the platform rationale)
- Basemap is already key-free; keep it that way for anything client-facing.
- Fonts are already self-hosted.
- Before final handover, vendor any remaining third-party scripts (e.g. the
  pmtiles library if used) locally so the site is fully self-contained.

## Data-protection note
Do not publish raw survey data. Only de-identified/aggregated survey layers may
go into `map/`. This mirrors the narrative's own commitment that public outputs
use de-identified images only and report no individual responses.

---
*Draft prepared with Triple Line branding. Treat all figures, camera framing and
layer styling as an unverified working draft to be reviewed before use.*
