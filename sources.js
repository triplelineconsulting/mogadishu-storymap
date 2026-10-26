/* =============================================================================
   Mogadishu Flood Risk Story Map — sources.js
   -----------------------------------------------------------------------------
   ACTIVE LAYERS (real project data, EPSG:4326):
     - flood-t2 / t25 / t100   depth bands   (./map/flood_*.geojson)
     - survey-targets          15 areas      (./map/survey_targets_4326.geojson)
     - key-infrastructure      396 points    (./map/key_infrastructure_points_4326.geojson)
     - retention-ponds         7 points      (./map/retention_ponds_4326.geojson)
   Layer draw order below = bottom to top: flood sits under everything, points on top.
   All start invisible (opacity 0) and fade in per chapter via config.js.

   Flood "band" values:  1: 0.1-0.5m  2: 0.5-1m  3: 1-2m  4: 2-4m  5: >4m
   ============================================================================= */

var floodPaint = {
    'fill-color': [
        'match', ['get', 'band'],
        1, '#cfe8f0',
        2, '#9ed3e2',
        3, '#5fb0cf',
        4, '#2b7bb0',
        5, '#17547f',
        '#9ed3e2'
    ],
    'fill-opacity': 0
};

var externalData = {
    sources: [
        { name: 'flood-t100', source: { type: 'geojson', data: './map/flood_t100.geojson' } },
        { name: 'flood-t25',  source: { type: 'geojson', data: './map/flood_t25.geojson' } },
        { name: 'flood-t2',   source: { type: 'geojson', data: './map/flood_t2.geojson' } },
        { name: 'flood-t100-ponds', source: { type: 'geojson', data: './map/flood_t100_ponds.geojson' } },
        { name: 'flood-t25-ponds',  source: { type: 'geojson', data: './map/flood_t25_ponds.geojson' } },
        { name: 'flood-t2-ponds',   source: { type: 'geojson', data: './map/flood_t2_ponds.geojson' } },
        { name: 'buildings-grid', source: { type: 'geojson', data: './map/buildings_exposure_grid_4326.geojson' } },
        { name: 'survey-targets', source: { type: 'geojson', data: './map/survey_targets_4326.geojson' } },
        { name: 'key-infrastructure', source: { type: 'geojson', data: './map/key_infrastructure_points_4326.geojson' } },
        { name: 'retention-ponds', source: { type: 'geojson', data: './map/retention_ponds_4326.geojson' } }
    ],

    layers: [
        /* ---- FLOOD DEPTH BANDS (bottom). t100 lowest, t2 on top so the common-flood core reads over the severe extent. ---- */
        { id: 'flood-t100-fill', type: 'fill', source: 'flood-t100', paint: JSON.parse(JSON.stringify(floodPaint)) },
        { id: 'flood-t25-fill',  type: 'fill', source: 'flood-t25',  paint: JSON.parse(JSON.stringify(floodPaint)) },
        { id: 'flood-t2-fill',   type: 'fill', source: 'flood-t2',   paint: JSON.parse(JSON.stringify(floodPaint)) },
        { id: 'flood-t100-ponds-fill', type: 'fill', source: 'flood-t100-ponds', paint: JSON.parse(JSON.stringify(floodPaint)) },
        { id: 'flood-t25-ponds-fill',  type: 'fill', source: 'flood-t25-ponds',  paint: JSON.parse(JSON.stringify(floodPaint)) },
        { id: 'flood-t2-ponds-fill',   type: 'fill', source: 'flood-t2-ponds',   paint: JSON.parse(JSON.stringify(floodPaint)) },

        /* ---- BUILDINGS EXPOSURE GRID (% of buildings flooded in 1-in-100) ---- */
        {
            id: 'buildings-grid-fill', type: 'fill', source: 'buildings-grid',
            paint: {
                'fill-color': [
                    'interpolate', ['linear'], ['get', 'pct_t100'],
                    0,  '#FEEDDE',
                    10, '#FDD0A2',
                    25, '#FDAE6B',
                    40, '#FD8D3C',
                    60, '#E6550D',
                    80, '#A63603'
                ],
                'fill-opacity': 0
            }
        },

        /* ---- SURVEY TARGET AREAS ---- */
        {
            id: 'survey-targets-fill', type: 'fill', source: 'survey-targets',
            paint: { 'fill-color': '#F78D2A', 'fill-opacity': 0 }
        },
        {
            id: 'survey-targets-line', type: 'line', source: 'survey-targets',
            paint: { 'line-color': '#B4611A', 'line-width': 1.5, 'line-opacity': 0 }
        },

        /* ---- KEY INFRASTRUCTURE (points, coloured by type) ---- */
        {
            id: 'key-infrastructure', type: 'circle', source: 'key-infrastructure',
            paint: {
                'circle-radius': ['match', ['get','type'], 'airport',7,'port',7,'health facility',5, 5],
                'circle-color': ['match', ['get','type'],
                    'health facility','#F78D2A','education','#00BBD2','airport','#4C5560',
                    'port','#4C5560','public buldings','#00797E','points of interest','#8FA3B0','#8FA3B0'],
                'circle-stroke-color': '#ffffff', 'circle-stroke-width': 1,
                'circle-opacity': 0, 'circle-stroke-opacity': 0
            }
        },

        /* ---- RETENTION PONDS (points, top) ---- */
        {
            id: 'retention-ponds', type: 'circle', source: 'retention-ponds',
            paint: {
                'circle-radius': 7, 'circle-color': '#00797E',
                'circle-stroke-color': '#ffffff', 'circle-stroke-width': 2,
                'circle-opacity': 0, 'circle-stroke-opacity': 0
            }
        }
    ]
};
