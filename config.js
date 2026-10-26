/* =============================================================================
   Mogadishu Flood Risk Story Map — config.js  (published version)
   ~9 chapters. Pond flood scenarios and exposure layers are reader toggles
   (see each chapter's `controls`). Basemap = key-free OpenFreeMap.
   ============================================================================= */

var depthKey =
    "<div class='row'><span class='swatch' style='background:#cfe8f0'></span>0.1&ndash;0.5 m</div>" +
    "<div class='row'><span class='swatch' style='background:#9ed3e2'></span>0.5&ndash;1 m</div>" +
    "<div class='row'><span class='swatch' style='background:#5fb0cf'></span>1&ndash;2 m</div>" +
    "<div class='row'><span class='swatch' style='background:#2b7bb0'></span>2&ndash;4 m</div>" +
    "<div class='row'><span class='swatch' style='background:#17547f'></span>&gt;4 m</div>";

var config = {
    style: 'https://tiles.openfreemap.org/styles/liberty',
    accessToken: '',
    showMarkers: false,
    markerColor: '#00797E',
    theme: 'light',
    use3dTerrain: false,
    useCustomLayers: true,
    inset: false,
    legend: false,
    bookmarks: true,
    chapterReturn: false,
    title: 'Flood Risk in Mogadishu',
    subtitle: 'A World Bank flood risk diagnostic',
    byline: 'Prepared by Triple Line',
    footer: 'Source: World Bank Mogadishu Flood Risk Diagnostic (2025). ' +
        'Built with the <a href="https://github.com/digidem/maplibre-storymap" target="_blank">MapLibre Storytelling</a> template. ' +
        'Basemap © OpenFreeMap / OpenStreetMap contributors.',
    chapters: [
        {
            id: 'why-flooding-matters', alignment: 'left', hidden: false,
            title: 'Why flooding matters for the city',
            description: `
                <p>Mogadishu is Somalia's capital and largest city, and central to the country's economic recovery. But as it grows, it faces a growing threat: flooding.</p>
                <p>On average, flooding costs the city an estimated <span class="stat">USD 120 million a year</span> in damage to homes, businesses, and infrastructure, though the real toll varies widely from year to year. A single severe storm could affect roughly <span class="stat">400,000 people</span>, damaging more than 50,000 buildings and 600 kilometres of road. The majority of these costs fall on private citizens and businesses whose homes and premises are damaged by floods; the Municipality of Mogadishu is making strategic investments to reduce that risk.</p>
                <p>As the city continues to grow, so does the risk to its residents and assets. How Mogadishu manages floods, with support from the private sector, development partners, and local communities, will shape the impact of this hazard.</p>`,
            location: { center: [45.3182, 2.0450], zoom: 11.2, pitch: 0, bearing: 0 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: false,
            callback: '', onChapterEnter: [], onChapterExit: []
        },
        {
            id: 'understanding-risk', alignment: 'right', hidden: false,
            title: 'Understanding the risk',
            description: `
                <p>Reducing flood risk starts with understanding it. In 2025, the World Bank commissioned a detailed technical diagnostic of Mogadishu's flooding, built on flood modelling, spatial analysis, damage-and-risk modelling, and field surveys. It builds directly on the city's existing Trunk Drainage Master Plan and the Somalia Urban Resilience Project (SURP-II), turning evidence into a clear set of priorities for where risk is greatest and what can be done about it.</p>
                <p>It draws on several technical strands of evidence: <strong>urban spatial analysis</strong> profiling the city's development and projected expansion; <strong>flood modelling</strong> of how rainfall flows over Mogadishu's terrain and limited drainage, mapping flood depth for a range of scenarios, from frequent events with a high chance of occurring in any given year (a 1-in-2-year event) through to rare, severe events with about a 1% chance in any given year (a 1-in-100-year event); a <strong>damage-and-risk model</strong> translating those depths into impacts on buildings, roads, and people; and <strong>field surveys</strong> of households and businesses capturing how flooding disrupts daily life. The emerging findings were then tested with local stakeholders at a validation workshop, so the diagnostic reflects local knowledge and institutional realities.</p>
                <details class="deep-dive"><summary>The flood modelling toolkit</summary><div class="dd-body">
                    <p>Understanding flood risk means answering two questions: where will water go, and how deep will it get? Two tools make that possible. A <strong>Digital Terrain Model (DTM)</strong> is a detailed 3D map of the bare ground surface, with buildings and trees stripped away to leave the true shape of the land. Because water follows the terrain, downhill and into low points, this is the foundation the whole flood model is built on.</p>
                    <p>The terrain is then fed into <strong>hydraulic flood-simulation software</strong>, which combines it with rainfall and drainage data to compute where floodwater flows, where it pools, and how deep it becomes, for each rainfall scenario. Together, the terrain model and the simulation turn rainfall into the flood-depth maps that drive the rest of this diagnostic.</p>
                </div></details>`,
            sidePanel: `<div class='row'><span class='swatch' style='background:#F78D2A'></span>Field survey target areas</div><div class='cap'>Neighbourhoods where household and business surveys were carried out, sampled across planned, unplanned and displacement areas.</div>`,
            location: { center: [45.2554, 2.0555], zoom: 11.2, pitch: 0, bearing: 0 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: false, callback: '',
            onChapterEnter: [
                { layer: 'survey-targets-fill', opacity: 0.35, duration: 500 },
                { layer: 'survey-targets-line', opacity: 1, duration: 500 }
            ],
            onChapterExit: [
                { layer: 'survey-targets-fill', opacity: 0 },
                { layer: 'survey-targets-line', opacity: 0 }
            ]
        },
        {
            id: 'flood-genesis', alignment: 'left', hidden: false,
            title: 'Why Mogadishu floods',
            description: `
                <p>Mogadishu's flooding is driven mainly by intense rainfall overwhelming the city's limited drainage. The city's worst flooding clusters around its retention ponds. These sit in the city's low-lying pockets, where water is meant to collect and drain. But the ponds are overwhelmed: outlets are silted and natural routes to the sea are blocked by the built environment. When it rains, stormwater follows the natural flow paths to the city's edges.</p>
                <figure><img src="./images/Urbanism_vs_climate_change.jpg" alt="Relative effects of climate change and urbanisation on flood hazard"><figcaption>Relative effects of climate change and urbanization on flood hazard. Flood extents show locations with 30 cm or more predicted flooding. Source: <a href="https://tripleline.com/" target="_blank">Triple Line</a> and HKV.</figcaption></figure>
                <p>The risk is being made worse by how the city is growing. A warming climate adds modestly to Mogadishu's rainfall, but the city itself is changing fast. As Mogadishu expands, hard surfaces replace open and permeable ground, so water that once soaked away now runs straight off, spreading onto the very flow paths and depressions that are already prone to flooding. The evidence is clear: unplanned urban growth is driving the rise in risk, and that means the solution has to be about how the city grows.</p>
                <figure><img src="./images/Projected_Urban_growth.jpg" alt="Potential direction of future urban growth in Mogadishu to 2060"><figcaption>Potential direction of future urban growth in Mogadishu to 2060. Source: <a href="https://tripleline.com/" target="_blank">Triple Line</a>.</figcaption></figure>`,
            sidePanel: `<div class='row'><span class='swatch' style='background:#00797E;border-radius:50%'></span>Stormwater retention ponds</div><div class='cap'>Low-lying areas where floodwater is meant to collect and drain, but which are now overwhelmed.</div><div class='row'><strong>Flood depth (1-in-100-year)</strong></div>` + depthKey,
            location: { center: [45.3194, 2.0350], zoom: 12.3, pitch: 35, bearing: -10 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: false, callback: '',
            onChapterEnter: [
                { layer: 'flood-t100-fill', opacity: 0.6, duration: 500 },
                { layer: 'retention-ponds', opacity: 1, duration: 500 }
            ],
            onChapterExit: [
                { layer: 'flood-t100-fill', opacity: 0 },
                { layer: 'retention-ponds', opacity: 0 }
            ]
        },
        {
            id: 'how-hazard-grows', alignment: 'right', hidden: false,
            title: 'How the hazard grows',
            description: `
                <p>The flood hazard grows with the severity of the storm. As the storm becomes rarer and more extreme, from a frequent event with a high chance of occurring in any given year (a "1-in-2-year" flood) to a rare, severe one (a "1-in-100-year" flood), the area and depth of flooding expand as well.</p>
                <p>Mogadishu's worst flooding clusters around its retention ponds; around these ponds, a severe flood can damage buildings up to 200 metres away and disrupt surrounding roads. <em>Use the scenario buttons to step through the flood from the common 1-in-2-year event to the severe 1-in-100-year event, and pan and zoom to explore.</em></p>
                <details class="deep-dive"><summary>What is a return period?</summary><div class="dd-body">
                    <p>A return period describes how rare a flood is. It is a statement about likelihood, not a fixed schedule: a "1-in-25-year flood" (T25) is not one that arrives every 25 years, but one with a 4% chance of occurring in any given year, and two such events can fall in successive years. Larger return periods (T50, T100) describe rarer, more damaging events. The 1-in-100-year flood shown here is the most severe event modelled in this diagnostic, not the worst flood physically possible. And as the climate and the city change, an event that counts as "1-in-25-year" today may arrive more often in future.</p>
                </div></details>`,
            sidePanel: `<div class='cap'>Blue shading is flood depth. Darker is deeper.</div>` + depthKey,
            controls: [
                { type: 'radio', title: 'Flood scenario', active: 0, items: [
                    { label: '1-in-2', layers: ['flood-t2-ponds-fill'], opacity: 0.9 },
                    { label: '1-in-25', layers: ['flood-t25-ponds-fill'], opacity: 0.9 },
                    { label: '1-in-100', layers: ['flood-t100-ponds-fill'], opacity: 0.9 }
                ]},
                { type: 'checkbox', title: 'Overlays', items: [
                    { label: 'Retention ponds', color: '#00797E', layers: ['retention-ponds'], opacity: 1, on: true }
                ]}
            ],
            location: { center: [45.3194, 2.0350], zoom: 13.4, pitch: 30, bearing: 0 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: true, callback: '',
            onChapterEnter: [
                { layer: 'flood-t2-ponds-fill', opacity: 0.9, duration: 500 },
                { layer: 'flood-t25-ponds-fill', opacity: 0 },
                { layer: 'flood-t100-ponds-fill', opacity: 0 },
                { layer: 'retention-ponds', opacity: 1, duration: 500 }
            ],
            onChapterExit: [
                { layer: 'flood-t2-ponds-fill', opacity: 0 },
                { layer: 'flood-t25-ponds-fill', opacity: 0 },
                { layer: 'flood-t100-ponds-fill', opacity: 0 },
                { layer: 'retention-ponds', opacity: 0 }
            ]
        },
        {
            id: 'who-is-exposed', alignment: 'left', hidden: false,
            title: 'Who and what is exposed',
            description: `
                <p>Flooding reaches a large and growing share of Mogadishu's residents. A frequent storm exposes around <strong>73,000 people</strong> today; a severe one, close to <strong>400,000</strong>. Exposure is highest in the dense central districts, but it extends to the unplanned areas and displacement camps at the city's edges. And it is rising: <strong>by 2060, the number of people exposed to what is today a common flood is expected to almost double, from roughly 73,000 to 130,000.</strong></p>
                <figure><img src="./images/Change_in_population_at_risk_by_return_period.jpg" alt="Change in population at risk by return period"><figcaption>Change in population at risk by return period across climate scenarios. Based on exposure to flood depths more than 30 cm under each return scenario, using current population with projected 2060 climate scenarios. Source: <a href="https://tripleline.com/" target="_blank">Triple Line</a>.</figcaption></figure>
                <p>Although Mogadishu is expanding rapidly, most of the city's building value remains concentrated in the centre: apartments, commercial premises, and industry clustered in the busiest districts. As storms intensify, the share of buildings affected climbs from around 6% in a common event to nearly 28% in a severe one, and flooding disrupts substantial lengths of road even in frequent events.</p>
                <p>And it is not just more people and buildings in harm's way; the cost is climbing too. Annual damage is projected to rise by around a third by 2060, even as a much smaller, everyday flood is expected to cause nearly 50% more damage than it does today. <em>Toggle the exposure layers on and off below.</em></p>
                <figure><img src="./images/Hex_damage.jpg" alt="Estimated value of buildings in Mogadishu"><figcaption>Estimated value of buildings in Mogadishu (estimated construction cost, buildings only). Source: <a href="https://tripleline.com/" target="_blank">Triple Line</a>.</figcaption></figure>`,
            sidePanel: `<div class='row'>Share of buildings flooded (1-in-100-year):</div><div class='row'><span class='swatch' style='background:#FEEDDE'></span><span class='swatch' style='background:#FDD0A2'></span><span class='swatch' style='background:#FDAE6B'></span><span class='swatch' style='background:#FD8D3C'></span><span class='swatch' style='background:#E6550D'></span><span class='swatch' style='background:#A63603'></span> &nbsp;low &rarr; high</div><div class='row' style='margin-top:8px'><strong>Key infrastructure</strong></div><div class='row'><span class='swatch' style='background:#F78D2A;border-radius:50%'></span>Health &nbsp; <span class='swatch' style='background:#00BBD2;border-radius:50%'></span>Education &nbsp; <span class='swatch' style='background:#00797E;border-radius:50%'></span>Public buildings</div><div class='row'><span class='swatch' style='background:#8FA3B0;border-radius:50%'></span>Other &nbsp; <span class='swatch' style='background:#4C5560;border-radius:50%'></span>Airport / port</div>`,
            controls: [
                { type: 'checkbox', title: 'Show on map', items: [
                    { label: 'Buildings flooded', color: '#E6550D', layers: ['buildings-grid-fill'], opacity: 0.7, on: true },
                    { label: 'Key infrastructure', color: '#00797E', layers: ['key-infrastructure'], opacity: 1, on: true }
                ]}
            ],
            location: { center: [45.3050, 2.0600], zoom: 11.4, pitch: 15, bearing: 0 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: false, callback: '',
            onChapterEnter: [
                { layer: 'buildings-grid-fill', opacity: 0.7, duration: 500 },
                { layer: 'key-infrastructure', opacity: 1, duration: 500 }
            ],
            onChapterExit: [
                { layer: 'buildings-grid-fill', opacity: 0 },
                { layer: 'key-infrastructure', opacity: 0 }
            ]
        },
        {
            id: 'vulnerability', alignment: 'right', hidden: false,
            title: 'Why the same flood impacts some far more',
            description: `
                <p>Flooding does not affect everyone equally. The people most exposed are often those least able to recover. Mogadishu's urban poor and displaced communities carry a disproportionate share of the impact. Many live in unplanned areas along the flow paths at the city's edge, in poor-quality housing, with insecure tenure and limited access to services. These are the areas least equipped to cope.</p>
                <p>A flood's cost is not only what it destroys. It cuts off the roads people depend on to reach work and school. It closes businesses and costs workers their income. It raises the risk of disease where water sits stagnant and sanitation fails.</p>
                <p>The surveys make this concrete. Around half of the households surveyed had been forced to relocate because of flooding. Children miss about five days of school, on average, for every flood. And roughly a quarter of businesses reported staff unable to reach work, cutting into the livelihoods a family depends on.</p>
                <figure><img src="./images/Mog_household_survey_locations.jpg" alt="Household survey locations across Mogadishu"><figcaption>Household survey locations across the survey target areas. Source: <a href="https://tripleline.com/" target="_blank">Triple Line</a>.</figcaption></figure>
                <figure><img src="./images/Mog_business_survey_locations.jpg" alt="Business survey locations across Mogadishu"><figcaption>Business survey locations across the survey target areas. Source: <a href="https://tripleline.com/" target="_blank">Triple Line</a>.</figcaption></figure>
                <details class="deep-dive"><summary>About the field surveys</summary><div class="dd-body">
                    <p>The field surveys provide the on-the-ground evidence used to ground-truth the damage-and-risk model. Fieldwork used structured household and business questionnaires, administered in areas of Mogadishu with a known history of flooding and targeted across different settlement types (planned areas, unplanned areas, and displacement camps) so that a range of exposure profiles was captured. The instruments captured both quantitative and qualitative data: direct property damage, displacement and relocation, days of school and work lost, income and business disruption, interruptions to water, sanitation, and electricity, receipt of early warning, and the coping strategies households rely on.</p>
                    <p>Responses are self-reported and based on recall of past flood events, so the figures carry the usual recall and reporting caveats. Respondents gave informed consent, including for the photographs of housing. Public outputs use de-identified images only and report no individual responses.</p>
                </div></details>`,
            sidePanel: `<h4>Variation in surveyed housing stock</h4><img src="./images/Jingaad.jpg" alt="Surveyed housing"><img src="./images/Bussbas.jpg" alt="Surveyed housing"><img src="./images/raised_shop.jpg" alt="Raised shop entrance"><div class='cap'>The condition of housing stock in the city makes it susceptible to serious flood damage, particularly for low-income households. IDPs and ultra-low-income families frequently reside in poorly constructed dwellings made from temporary or lightweight materials, such as corrugated iron sheets and timber, which are highly vulnerable to flooding. Source: <a href="https://tripleline.com/" target="_blank">Triple Line</a>; photos taken with consent of homeowners and businesses surveyed.</div><div class='row' style='border-top:1px solid #CFD3D3;padding-top:8px'><span class='swatch' style='background:#F78D2A'></span>Survey target areas (shown on map)</div>`,
            location: { center: [45.2554, 2.0555], zoom: 11.6, pitch: 20, bearing: 0 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: false, callback: '',
            onChapterEnter: [
                { layer: 'survey-targets-fill', opacity: 0.35, duration: 500 },
                { layer: 'survey-targets-line', opacity: 1, duration: 500 }
            ],
            onChapterExit: [
                { layer: 'survey-targets-fill', opacity: 0 },
                { layer: 'survey-targets-line', opacity: 0 }
            ]
        },
        {
            id: 'citywide-response', alignment: 'left', hidden: false,
            title: 'An integrated approach across two geographies',
            description: `
                <p>The diagnostic sets out a strategy for reducing Mogadishu's flood risk, built on the principles of integrated urban stormwater management: managing stormwater across the whole city, slowing and holding it, and directing it along protected paths.</p>
                <p>In practice, that means working across two very different parts of the city: the dense central core, where an engineered drainage network is already taking shape, and the fast-growing wider city, where the priority is to retain runoff and extend drainage in step with new urban growth, before the flood-prone areas of tomorrow are built over.</p>
                <p>No single measure solves flooding completely. The response draws on three kinds of solution together: engineered <strong>grey infrastructure</strong> (pipes, channels, and the trunk drainage network); <strong>nature-based solutions</strong> (retention ponds repurposed for storage, green corridors, and vegetated buffers); and <strong>non-structural measures</strong> (land-use planning, solid-waste management, and flood early warning). Increasingly these are combined in hybrid grey-green infrastructure, single assets that pair engineered and natural elements, such as a drainage channel with vegetated banks that both conveys and absorbs stormwater. These measures also create work, and by keeping roads, markets, and businesses open through the rainy season, flood protection safeguards the jobs the city already depends on.</p>`,
            location: { center: [45.3150, 2.0500], zoom: 11.5, pitch: 0, bearing: 0 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: false,
            callback: '', onChapterEnter: [], onChapterExit: []
        },
        {
            id: 'resilient-mogadishu', alignment: 'right', hidden: false,
            title: 'Priorities for a growing city',
            description: `
                <p>Mogadishu is growing faster than almost any city in the region, and the choices made now will shape how it grows for decades. Left unmanaged, flood risk will climb with every new season of expansion. The diagnostic points to a clear, phased way forward: a strategy organised around four complementary pillars, each addressing a distinct dimension of the city's current and future flood risk.</p>
                <p><strong>Pillar 1: Flood preparedness and risk-informed planning</strong> — reducing exposure and vulnerability, through citywide non-structural measures with targeted support for high-risk and vulnerable communities: flood risk information and early warning, community preparedness, flood-resilient building standards, and better drainage maintenance and solid-waste management.</p>
                <p><strong>Pillar 2: Priority risk hotspots</strong> — reducing concentrated existing risk, through targeted structural investment (grey, nature-based, and hybrid) in the dense central areas, complementing the city's Drainage Master Plan.</p>
                <p><strong>Pillar 3: Beyond the hotspots</strong> — citywide drainage coverage, progressively extending secondary and tertiary drainage across the city, prioritised by flood risk, network connectivity, and project readiness.</p>
                <p><strong>Pillar 4: Anticipating future urban growth</strong> — preventing new flood risk, by reserving and protecting the land needed for future drainage and retention in the fast-growing expansion areas, and applying risk-sensitive planning, zoning, and development controls.</p>
                <p>Done well, this is also an investment in the city's economy: protecting the jobs and businesses Mogadishu has today, and creating new work in building the resilient city it needs tomorrow. Managing flood risk is not a single fix but a continuing commitment; one that protects lives, livelihoods, and the future of a city central to Somalia's national economy and urban transition.</p>`,
            location: { center: [45.3150, 2.0500], zoom: 11.0, pitch: 25, bearing: 0 },
            mapAnimation: 'flyTo', rotateAnimation: false, mapInteractive: false,
            callback: '', onChapterEnter: [], onChapterExit: []
        },
        {
            id:'about', alignment:'center', hidden:false,
            title:'About this story map',
            description:`
                <p style="color:#4C5560">This story map was prepared by Triple Line in partnership with HKV and Raagsan for the World Bank as part of Diagnostic Work for Climate Resilient Urban Development. It is designed to raise awareness and share key findings. The flood modelling, exposure and damage figures are indicative estimates drawn from the diagnostic. They are not a substitute for detailed engineering design or site-specific assessment. Maps are simplified for communication and should not be used for precise measurement. Please verify all figures before using them in decision-making.</p>
                <p style="color:#4C5560">The ACP-EU Disaster Risk Management Program, managed by the Global Facility for Disaster Reduction and Recovery (GFDRR), is funded by the European Union.</p>
                <p style="color:#4C5560">The findings, interpretations and conclusions expressed here are those of the authors and do not necessarily reflect the views of The World Bank, its Board of Executive Directors, or the governments they represent. The World Bank does not guarantee the accuracy of the data included in this work. The boundaries, colors, denominations and other information shown on any map do not imply any judgment on the part of The World Bank concerning the legal status of any territory or the endorsement or acceptance of such boundaries.</p>
                <p style="color:#4C5560">The sole responsibility of this publication lies with the author. The European Union is not responsible for any use that may be made of the information contained therein.</p>
                <div class="logo-strip"><img class="lg-mopw" src="./images/logo-mopw.png" alt="Ministry of Public Works, Reconstruction &amp; Housing"><img class="lg-crest" src="./images/logo-banadir.png" alt="Banadir Regional Administration"><span class="eu-block"><img class="lg-eu" src="./images/logo-eu.png" alt="European Union"><span class="eu-text">Funded by the<br>European Union</span></span><img class="lg-acp" src="./images/logo-acp.png" alt="OACPS"><img class="lg-gfdrr" src="./images/logo-gfdrr.png" alt="GFDRR, administered by the World Bank"><img class="lg-tl" src="./images/logo-tripleline.jpg" alt="Triple Line"><img class="lg-hkv" src="./images/logo-hkv.png" alt="HKV"><img class="lg-rg" src="./images/logo-raagsan.png" alt="Raagsan"></div>`,
            location:{ center:[45.315, 2.05], zoom:10.5, pitch:0, bearing:0 },
            mapAnimation:'flyTo', rotateAnimation:false, mapInteractive:false, callback:'',
            onChapterEnter:[], onChapterExit:[]
        }
    ]
};
