# Fonts

Self-hosted **Libre Franklin** (open-source, SIL Open Font License) used as the
web stand-in for the Triple Line brand fonts:

- `LibreFranklin-Regular.woff2` (weight 400) = Franklin Gothic Book (body)
- `LibreFranklin-Medium.woff2`  (weight 500) = Franklin Gothic Medium (headings)

These are already wired into `index.html` via `@font-face`. On Windows/Office
machines that have the real Franklin Gothic installed, the CSS falls back to it;
everyone else gets Libre Franklin, so the story renders consistently for the
World Bank reviewers regardless of platform.

Source: https://github.com/googlefonts/Libre-Franklin  (verify licence terms
before final handover so the deliverable's font licensing is documented.)
