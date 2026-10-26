#!/usr/bin/env bash
# =============================================================================
# prepare_layers.sh
# Clip the Mogadishu flood + survey GIS layers to the city AOI and convert them
# to web tiles (PMTiles / GeoJSON) for the MapLibre story map.
#
# THIS IS A TEMPLATE. Nothing here has been run yet because the source GIS data
# has not been provided. Fill in the INPUTS block, install the tools below, then
# run:  bash prepare_layers.sh
#
# Requirements (install once):
#   - GDAL/OGR        (gdalwarp, ogr2ogr, gdal_polygonize.py)  -> `apt install gdal-bin python3-gdal` or conda
#   - tippecanoe      (vector -> pmtiles)                       -> https://github.com/felt/tippecanoe
#   - rio-pmtiles     (raster -> pmtiles), optional             -> `pip install rio-pmtiles`
#
# Output: ./tiles/*.pmtiles and *.geojson  ->  copy into ../map/
# =============================================================================
set -euo pipefail

# ----------------------------- INPUTS (EDIT ME) ------------------------------
# Area of interest: a polygon of the Mogadishu study extent (shapefile/GeoJSON).
AOI="./source/mogadishu_aoi.geojson"

# Flood depth grids (rasters), one per return period. Adjust paths/names.
FLOOD_T2="./source/flood_depth_T2.tif"
FLOOD_T25="./source/flood_depth_T25.tif"
FLOOD_T100="./source/flood_depth_T100.tif"

# Vector inputs
RETENTION_PONDS="./source/retention_ponds.shp"
EXPOSED_BUILDINGS="./source/exposed_buildings.shp"
SURVEY_POINTS="./source/survey_points.shp"   # MUST be de-identified before tiling
EXPANSION_AREAS="./source/expansion_areas.shp"

OUT="./tiles"
mkdir -p "$OUT"
# -----------------------------------------------------------------------------

echo ">> Reproject everything to EPSG:4326 (web maps expect lon/lat) and clip to AOI"

# ---- FLOOD: clip raster, vectorise into depth bands, tile as pmtiles ----
prepare_flood () {
  local src="$1" name="$2"
  [ -f "$src" ] || { echo "   ! skip $name (missing $src)"; return; }
  echo ">> Flood: $name"
  # 1. clip + reproject the depth raster to the AOI
  gdalwarp -t_srs EPSG:4326 -of GTiff -cutline "$AOI" -crop_to_cutline \
           -dstnodata 0 "$src" "$OUT/${name}_clip.tif"
  # 2. reclassify to depth bands and polygonize (bands: 0.1-0.5, 0.5-1, 1-2, >2 m)
  #    (simple polygonize of all wet cells shown here; refine banding as needed)
  gdal_calc.py -A "$OUT/${name}_clip.tif" --outfile="$OUT/${name}_mask.tif" \
               --calc="A*(A>0.1)" --NoDataValue=0
  gdal_polygonize.py "$OUT/${name}_mask.tif" -f GeoJSON "$OUT/${name}.geojson" "$name" depth_m
  # 3. tile to pmtiles
  tippecanoe -zg --projection=EPSG:4326 -o "$OUT/${name}.pmtiles" \
             -l "$name" --drop-densest-as-needed --force "$OUT/${name}.geojson"
}
prepare_flood "$FLOOD_T2"   "flood_t2"
prepare_flood "$FLOOD_T25"  "flood_t25"
prepare_flood "$FLOOD_T100" "flood_t100"

# ---- VECTORS: clip to AOI, reproject, tile ----
prepare_vector () {
  local src="$1" name="$2" is_points="${3:-no}"
  [ -f "$src" ] || { echo "   ! skip $name (missing $src)"; return; }
  echo ">> Vector: $name"
  ogr2ogr -t_srs EPSG:4326 -clipdst "$AOI" -f GeoJSON "$OUT/${name}.geojson" "$src"
  if [ "$is_points" = "points" ]; then
    tippecanoe -zg -o "$OUT/${name}.pmtiles" -l "$name" -r1 --cluster-distance=0 --force "$OUT/${name}.geojson"
  else
    tippecanoe -zg -o "$OUT/${name}.pmtiles" -l "$name" --drop-densest-as-needed --force "$OUT/${name}.geojson"
  fi
}
prepare_vector "$RETENTION_PONDS"   "retention_ponds"
prepare_vector "$EXPOSED_BUILDINGS" "exposed_buildings"
prepare_vector "$EXPANSION_AREAS"   "expansion_areas"

# SURVEY POINTS: only tile the DE-IDENTIFIED file. Do not tile raw PII.
prepare_vector "$SURVEY_POINTS" "survey_points" points

echo ""
echo ">> Done. Review $OUT, then: cp $OUT/*.pmtiles $OUT/*.geojson ../map/"
echo ">> Then uncomment the matching entries in ../sources.js and set useCustomLayers: true in ../config.js"
