# Kerala geographic boundary

`kerala.geojson` is the Kerala feature (`IN-KL`) extracted from the geoBoundaries gbOpen India ADM1 dataset, pinned at revision `9469f09`.

- Source: https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/IND/ADM1/geoBoundaries-IND-ADM1_simplified.geojson
- Dataset metadata: https://www.geoboundaries.org/api/current/gbOpen/IND/ADM1/
- Attribution: geoBoundaries / DataMeet India community / Election Commission of India
- License: Creative Commons Attribution 2.5 India, https://creativecommons.org/licenses/by/2.5/in/
- Reference boundary year: 2011

Changes: extracted the Kerala feature, rounded geographic coordinates to six decimal places, and added attribution metadata. `node scripts/build-kerala-map.cjs` projects this data into the site's inline SVG. Its pins use the same projection and the district reference coordinates in `src/data/destinations.ts`. The map is an editorial district explorer, not a navigation tool.
