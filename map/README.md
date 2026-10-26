# map/  — web tiles for the story map

This folder holds the tiled data layers the story map draws on top of the
basemap (flood extents, retention ponds, exposed buildings, de-identified survey
points, expansion areas), plus optional terrain tiles for 3D.

It is EMPTY in this draft because the source GIS data has not been provided yet.
Produce the tiles with `../data/prepare_layers.sh`, copy the resulting
`*.pmtiles` / `*.geojson` here, then activate them in `../sources.js`.
