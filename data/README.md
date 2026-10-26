# data/  — source GIS + preparation

Put the raw project GIS layers in `data/source/`, then run
`bash prepare_layers.sh` to clip them to the Mogadishu AOI and tile them for the
web. Outputs land in `data/tiles/`, which you then copy into `../map/`.

## What to drop into data/source/  (this is what is still needed)
- `mogadishu_aoi.geojson`     — study-area boundary polygon (the clip extent)
- `flood_depth_T2.tif`        — flood depth raster, 1-in-2-year
- `flood_depth_T25.tif`       — flood depth raster, 1-in-25-year
- `flood_depth_T100.tif`      — flood depth raster, 1-in-100-year
  (add any other modelled return periods used in the narrative)
- `retention_ponds.shp`       — retention pond polygons (incl. Warta Nabada)
- `exposed_buildings.shp`     — buildings with exposure/damage attributes
- `survey_points.shp`         — field-survey locations, **DE-IDENTIFIED ONLY**
- `expansion_areas.shp`       — projected urban expansion / city boundary
- (optional) DTM / terrain tiles if 3D terrain is wanted

## Data-protection note (important)
Do NOT place raw survey data containing personal or precise household-identifying
information into a layer that will be published. De-identify / aggregate first;
the narrative itself commits that "public outputs use de-identified images only
and report no individual responses." Keep the raw survey data out of this repo.
