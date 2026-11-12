# Photography review

## Current coverage — 29 October 2026

**Every one of the 465 public listings now displays a real photograph.** There are 440 listings with subject photographs and 25 with explicit area/venue/activity-context labels. The 348 distinct displayed files are locally hosted; the attribution archive contains 355 files, including superseded and supporting records.

| Collection | Listings | Subject photographs | Labelled context |
| --- | ---: | ---: | ---: |
| Destinations | 281 | 268 | 13 |
| Experiences | 14 | 11 | 3 |
| Food | 60 | 60 | 0 |
| Events | 15 | 8 | 7 |
| Stays | 5 | 3 | 2 |
| Stories | 73 | 73 | 0 |
| Districts and curated journeys | 17 | 17 | 0 |

The user explicitly approved real area-context photos for unresolved entries. `src/data/photo-context.ts` keeps these separate from verified subject images, names the actual pictured place, discloses the scope in visible captions and alt text, and never creates a pin or an exact-attraction gallery claim. All nine unverified identities retain their warnings and withheld coordinates. The four confirmed destination photo gaps remain exact-subject gaps, while their pages and cards now show clearly labelled district context.

The complete pass adds reviewed photographs of Nishagandhi 2024, the Nehru Trophy race, the Aranmula race, Kumarakom Lake Resort and Tea County Munnar. An identified Kerala Ayurveda retreat garden is used only as labelled context. Seven missing story images are matched to existing photographs of their actual subject; the ambiguous Nilambur resort cover is replaced by the local teak forest. Selections and matching evidence are reproducible in `scripts/editorial-photos.json` and `scripts/editorial-photo-aliases.json`.

The 163 inherited originals outside the earlier selection lists were visually reviewed as contact sheets. A geographic mismatch was found: **SAN BIRDS 48.jpg** is described by its source as Kurangini Hills in Tamil Nadu, despite being categorized under Silent Valley. It is no longer associated with either Silent Valley page. The replacement is [Davidvraju's identified Silent Valley evergreen forest photograph](https://commons.wikimedia.org/wiki/File:Evergreen_forest_of_Silent_Valley_Np_Kerala.jpg), published as CC0. The ambiguous Shendurney viper image was separately checked: its photographer explicitly identifies Shendurney WLS, Kerala, so it is retained.

Photographic source checks also exposed wrong district labels and inherited directions. [Kerala Tourism places Thoovanam in Chinnar, Idukki](https://www.keralatourism.org/kerala-article/2021/thoovanam-waterfalls/1095), and [Kozhippara in Malappuram](https://www.keralatourism.org/malabar/waterfalls-malappuram/218). District filters, copy and related destinations now use those locations. Their guessed entrance pins and unsupported cliff-jumping claims were removed; source references appear on their pages. This remains a photographic/catalogue review, not certification of every inherited visitor fact or present-day condition.

Production build, lint/type validation, editorial, planner and complete photo-coverage checks pass. All 355 attributed files decode. The complete display-photo delivery check passes **696 optimized image requests** at 640/1920 px, and the full HTTP sweep passes **468 pages/shortcuts and 1,016 image requests**, without failures. See `.qa/photo-coverage.json`, `.qa/complete-photo-delivery.json` and `.qa/site-check.json`.

The browser pass checks **926 layouts**: every destination, experience, food and story detail page, every public collection, the homepage, planner, monsoon and credits at 390/1440 px; 24 changed pages also at 768/1280 px. It verifies expected sources, decoded visible images, explicit context labels and alt text, retained unverified notices, withheld pins and fitting widths. No remaining issues were found. It exposed and fixed long source-URL overflow on 25 mobile stories and long place-name headings on three of those pages; all 73 mobile stories were rechecked after the fixes. Report: `.qa/complete-photo-browser.json`; original failures: `.qa/story-overflow-before.json`.

The newly illustrated Nehru Trophy experience gallery loads the reviewed image at both sizes with `object-contain`, closes with Escape and restores trigger focus. All five accommodation card images were decoded in the desktop browser, including both clearly labelled context cards. Gallery report: `.qa/complete-photo-galleries.json`. Screenshots: `.qa/photo-coverage-desktop.png` and `.qa/photo-coverage-mobile.png`. These are browser viewport checks, not a claim of physical-device testing.

## Earlier source work — 28 October 2026

Reviewed 28 October 2026. Of the 146 destination entries that previously had no verified photograph, **133 now have a manually reviewed, subject-matched cover**. The full destination collection has **268 photographed entries out of 281**, using 259 distinct covers. **All 60 foods** now have reviewed photographs. The attribution collection contains 350 local files, including the other editorial sections and two superseded food originals retained for traceability.

The photographs are local files, rather than hotlinks. `scripts/destination-photos.json` records the chosen source, descriptive alternative text, subject match, review status, and any necessary contextual caption. `public/media/manifest.json` retains the original file, creator, licence and source link. `/credits` exposes that information to visitors. `src/data/photo-captions.json` supplies crop positions and scene descriptions to the shared image component.

Location corrections discovered during this work include Thattekkad in Ernakulam, Beypore in Kozhikode, the southern Kappil Beach at Varkala, the spelling Anjarakkandy, and Kava's description as a reservoir viewpoint. Existing URLs are retained. These corrections do not constitute a complete fact check of every inherited article.

## Follow-up review of the last 18 entries

All 18 now have a recorded location review in `src/data/destination-locations.ts`: **nine documented locations and nine unverified attraction identities**. At the user's request, unverified entries keep their names and URLs. Their collection cards and detail pages say **Location unverified**. Their guessed pins and directions are withheld, and their inherited descriptions are retained behind an explicitly labelled archive disclosure. They are excluded from automatic nearby recommendations.

Five of the last 18 photo gaps are resolved:

| Place | Photograph and evidence |
| --- | --- |
| Kappil Beach, Kasaragod | [Raghavan Prabhu's photograph](https://www.flickr.com/photos/ragsclicks/28480704764), explicitly titled Kappil Beach, Bekal, Kerala, India; photographer-published CC BY 2.0. [Kerala Tourism](https://www.keralatourism.org/destination/kappil-beach-kasaragod/160/) separately confirms the destination and map reference. |
| Aralam Farm | Central nursery photograph published by [Aralam Grama Panchayat](https://aralampanchayat.lsgkerala.gov.in/en/gallery/aralam-farm). The portal's Copyright Policy allows accurate reproduction with prominent source acknowledgement except identified third-party material. Source credit appears on the photo. The [operator](https://aralamfarm.in/contact/) corroborates the farm address; a precise nursery entrance pin is withheld. |
| Vallikkunnu Beach | Original embedded JPEG from KCZMA's [field report, Plate 1, printed page 61 / PDF page 2](https://www.keralaczma.gov.in/images/pdf/czmp-2019-reports/malappuram/CZMP%20Report%20-%20MLPPRM%20Annexure%20-3.pdf#page=2). The caption gives Ariyallur village, Vallikkunnu Panchayat, and the mapped viewpoint. KCZMA's [reproduction policy](https://www.keralaczma.gov.in/mal/index.php/copyright-policy) allows accurate reproduction with acknowledgement. The survey photograph is labelled as archival. |
| Charalkunnu Hills | [Annotated archival view from Charalkunnu](https://commons.wikimedia.org/wiki/File:Airport_view.jpg), public domain. The Malayalam description identifies where it was taken. The old airport-proposal annotation is preserved and explained on the page and photo; it does not identify a current airport. [Kerala Tourism](https://www.keralatourism.org/destination/charalkunnu-hill-station/456/) confirms the hill destination. |
| Alumkadavu Boat Yard | Item **888, Alumkadavu, Kollam**, in Kerala Tourism's [Royalty Free Photos / Places of Interest collection](https://www.keralatourism.org/highresolutionimages/places-of-interest/), with its public [original download](https://www.keralatourism.org/download-hri.php?id=ODg4). The photograph shows the village waterfront; the caption explicitly distinguishes it from a working boatyard. Publisher credit and the collection's reuse basis are retained without asserting a Creative Commons licence. |

The 13 remaining destination photo gaps are distinguished below: four confirmed places and nine unverified identities. No unrelated image is substituted for them.

| Entry | Location outcome and outstanding requirement |
| --- | --- |
| Chavara Theertham | **Unverified.** The inherited Kollam pilgrimage site has not been identified. Chavara village, Chavara Bhavan and Mannanam are not silently substituted. |
| Kumbazha Forest | **Unverified attraction.** The historical Kumbazha area and Aruvappulam Reserve are documented, but no particular visitor forest or entrance under this name is established. |
| Seethathodu Dam | **Unverified structure.** Several dams are in Seethathodu; this entry does not identify which one. |
| Pala Hills | **Unverified attraction.** Pala town is documented, but a particular hill/viewpoint under this name is not established. |
| Keezharkuthu (Rainbow Falls) | **Documented location.** A matching reusable waterfall photograph is still needed; inspected photographer images reserved reproduction rights. |
| Elathur Mangroves | **Documented patches.** The coastal inventory identifies several mangrove patches, not a single visitor entrance. A photo identifying those mangroves is still needed. |
| Lion's Park, Kozhikode | **Documented location.** A reusable photograph of the actual coastal children's park is still needed. Mananchira Park is a different place. |
| Chethalayam Waterfalls | **Documented location.** A reusable photograph of the falls is still needed. A flower close-up taken there, other waterfalls and general Wayanad views were rejected. |
| Valmeekam | **Unverified mountain.** A museum/gallery or homestay using the same name does not verify the inherited mountain entry. |
| Payyamballi Beach | **Unverified.** Payyambalam already has its own entry, and Payyambally is inland. |
| Mallam Hills | **Unverified attraction.** A similarly named temple or Malom locality does not identify these hills. |
| Kanhiradukkam Forest | **Unverified attraction.** Government sources confirm the village, but no particular visitor forest under this name is established. |
| Oliyara Falls | **Unverified.** The exact waterfall identity and inherited coordinates are not established. |

Location evidence, review notes, checked dates and corrected coordinates are displayed on each of the 18 detail pages. Published map references are distinguished from visitor entrances. The review does not certify current opening/access conditions or the rest of the inherited catalog.

Searching a public photo service does not establish permission to republish a file. Kerala Tourism's ordinary [photography copyright notice](https://www.keralatourism.org/copyright) requires written permission, as does the inspected [Wayanad district website policy](https://wayanad.gov.in/en/website-policies/). Ordinary gallery photographs were not copied. Alumkadavu instead comes from the publisher's separate, explicitly labelled royalty-free collection. No photographer has been contacted on the project owner's behalf.

## Food photography audit

All 60 dishes were checked. The pass adds **33 missing food photographs**, replaces the unrelated-accompaniment images for **Appam with Vegetable Stew** and **Idiyappam**, and records descriptive alt text and a subject review for all **60 illustrated dishes** in `scripts/food-photos.json`. The vegetarian Idiyappam page no longer shows egg curry. Its inherited URL is preserved.

The new images include [Parippu Curry](https://commons.wikimedia.org/wiki/File:Parippu_Curry.jpg), [Olan](https://commons.wikimedia.org/wiki/File:Olan.jpg), [Appam and vegetable stew](https://commons.wikimedia.org/wiki/File:Appam_and_stew.jpg), Kootu Curry, Kalan, payasam, Karimeen Pollichathu, Sulaimani tea and the other individually reviewed dishes. Creator and licence information is retained per file. Detail pages now expose source and licence links directly below the photograph, in addition to `/credits`.

Context captions identify photographed variants and accompaniments: duck roast within a Christmas lunch; grated-coconut crab curry; bilimbi puliyinchi where the article describes tamarind; vegetable kurma as the photographed component of the porotta pairing; and whole meals with additional non-vegetarian accompaniments. The ghee-rice, vegetable-biryani, mutton-biryani and prawn-biryani sources identify the core dishes without documenting a particular Kerala regional recipe; their captions state that limit. They are not represented as photographs of a particular Kerala restaurant.

The final food gap, **Erachi Choru**, is resolved by [Dr. Chinchu C.'s photograph](https://commons.wikimedia.org/wiki/File:%E0%B4%87%E0%B4%B1%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B4%BF%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B5%8B%E0%B4%B1%E0%B5%8D.jpg), CC BY-SA 4.0. Its Malayalam title identifies the dish and its description explicitly identifies beef meat rice. It was found under the joined Malayalam spelling, visually reviewed and captioned as the beef variation.

The additional destination search inspected Commons geographic candidates, original photographer metadata, municipal/panchayat galleries and the publisher's royalty-free waterfall, backwater, park and places-of-interest collections. The bridge, plant and general forest photographs did not identify the four missing attractions and were rejected. Publicly accessible photographs of Keezharkuthu were found, but their inspected reuse rights did not permit copying into this project.

## Repeatable verification

- `npm run test:images` checks the provenance of every destination cover, verifies that each reviewed selection is connected to its actual source, and fetches all 259 covers through Next's optimizer at 640 px and 1920 px. A running local production server is required. The machine-readable report is `.qa/destination-images.json`.
- `npm run test:food-images` performs the same provenance and delivery checks for all 60 food images at both widths. Report: `.qa/food-images.json`.
- `npm run audit:images` reports missing coverage across the full site.
- `node scripts/check-site.cjs` checks all catalog routes, query shortcuts, internal paths and referenced image assets against the running server.
- Diagnostic contact sheets and source-search caches are in ignored `.qa/`. They are not required by the deployed site. The importer can retrieve selected Commons files or explicitly reviewed external sources if the cache is absent. Re-importing the KCZMA photograph requires PyMuPDF; it copies the original embedded JPEG without altering its pixels.
- The verified browser pass records 54 layout checks at 390, 768, 1280 and 1440 px in `.qa/destination-browser.json`. Desktop and mobile lightboxes display the photograph with `object-contain`; Escape closes them and returns focus to their trigger. Report: `.qa/destination-gallery.json`.
- `python scripts/complete-destination-photos.py --import-reviewed` imports only explicitly reviewed selections. Candidate search never changes the public catalog. Do not run the older wholesale media-refresh scripts over the reviewed index without reconciling these selections.
- Add `--collection dishes` to import only the reviewed food selections. Download endpoint query strings are preserved as part of external image identity, while Commons tracking parameters are excluded.

## Follow-up validation

The follow-up production build, lint, TypeScript, editorial, planner and travel API checks pass. The HTTP sweep checks 468 pages/shortcuts, 30 frontend assets, 81 internal paths and 906 image requests with zero failures. All 258 destination covers return valid optimized images at both 640 px and 1920 px (516 requests); all 314 local files decode successfully.

The 18 reviewed detail pages were checked at 390 px and 1440 px, with 12 additional checks of new photos/unverified pages at 768 px and 1280 px: 48 layouts with no overflow, broken visible images or route errors. Unverified entries publish no map pins. Search retains the location notice and query after browser Back. The new Flickr and survey photographs load in mobile and desktop lightboxes, retain their source credits, close with Escape and restore focus. Reports: `.qa/location-photo-browser.json`, `.qa/location-search-checks.json`, `.qa/location-gallery-checks.json`.

The follow-up also replaces unsupported visitor copy for the nine documented locations. This corrects the southern Kappil sandbar/swimming description on the Kasaragod page, the nonexistent Pathanamthitta railway-station reference on Charalkunnu, unsupported Elathur kayak services, and unverified Lions Park fountain shows. Transport references now use confirmed place names and avoid unsupported exact distances.

The northern Kappil entry is classified as beach/nature; the inherited backwater tag was removed along with the southern sandbar copy. The backwaters filter now contains 21 entries.

## Food and final-place validation

The production build, standalone lint, TypeScript, editorial and planner checks pass. All **350 attributed raster files decode successfully**. Responsive optimizer checks pass for **259 destination covers and 60 food covers at 640 and 1920 px: 638 successful responses**. The final HTTP sweep passes **468 pages/shortcuts, 30 frontend assets, 81 internal paths and 1,010 image requests**, with zero failures. Report: `.qa/site-check.json`.

Browser checks cover all 60 dish detail pages, all 18 location-review pages and both relevant collections at **390 and 1440 px**, plus eight representative pages at **768 and 1280 px**: **176 layouts**. All expected photographs load with the correct source, and no horizontal overflow, route errors or failed visible images remain. Nine unverified entries retain their notices and have no map pins. Cold image requests were rechecked after decoding; none remained pending or broken.

Eight representative galleries at mobile and desktop widths pass: **16 checks** of decoding, `object-contain`, arrow handling, Escape and restored focus. Reports: `.qa/food-destination-responsive.json`, `.qa/food-gallery-checks.json`, `.qa/food-images.json`, `.qa/destination-images.json`, and `.qa/site-check.json`. These are browser viewport checks, not physical-device claims.

## Additional search for the last four places

A further search on 28 October 2026 **did not establish any new suitable reusable photographs**. The four confirmed photo gaps and nine unverified identities remain; no unrelated image or unlicensed candidate was imported. [PHOTO_SOURCES_NEEDED.md](PHOTO_SOURCES_NEEDED.md) records the candidate source links, identification limits, outstanding rights and an unsent permission-request draft.

The follow-up checked 14 additional Flickr spelling/subject searches, 14 Commons title searches, the 25-entry royalty-free waterfall collection, the 101-entry Kerala Visuals collection, and KartaView's public nearby-image endpoint at the four documented locations. KartaView returned successful empty results. The older API hostname failed certificate verification; it was not bypassed. Openverse required authentication, so its results were unavailable and are not counted as empty. The coastal authority's Kozhikode field-photo annexure identifies other locations rather than an Elathur mangrove photograph. Public “image for representation” results and unrelated parks remain excluded.

Fresh verification passes: **52 layouts** of the four pending and nine unverified detail pages at 390, 768, 1280 and 1440 px; **638 responsive image responses**; and the full sweep of **468 pages/shortcuts and 1,010 image requests**, with zero failures. All nine unverified entries retain their notices and publish no map pins. Editorial and planner checks pass. Reports: `.qa/final-four-browser.json`, `.qa/destination-images.json`, `.qa/food-images.json`, and `.qa/site-check.json`. Application and public media files are unchanged by this follow-up.

## Alternative-source review for the four remaining photographs

The subsequent 28 October 2026 pass extended the search to Schoolwiki's English/Malayalam articles and image namespace, Udumbanoor Panchayat, all ten pages of Kozhikode Corporation's gallery, Sulthan Bathery Municipality, geolocated openly licensed iNaturalist observations, and YouTube's Creative Commons results. Exact-name/spelling variants and additional free-photo searches were also checked. [PHOTO_SOURCES_NEEDED.md](PHOTO_SOURCES_NEEDED.md) records source links and individual outcomes.

Five promising videos had explicit Creative Commons reuse metadata. Timestamped storyboards were visually reviewed: two films showed the Kaithappara off-road route; two showed Kozhikode beachfront/food stops. Neither a nearby location nor a description mentioning the attraction established a suitable frame of the missing subject. The remaining Idukki slideshow did not establish rights to its constituent photographs. No still was imported. A CC label on a compilation alone was not treated as evidence that every source photograph was licensed.

School records and local-government galleries showed other subjects, while the nearby naturalist observations primarily showed plants. The additional Incredible India source required express authorisation for republication. Openverse search was unavailable rather than an established empty result. No new photo satisfied both the location and reuse requirements; the four confirmed photo gaps remain distinct from the nine unverified attraction identities. Existing application data and public media were preserved.

Fresh checks completed at approximately 14:41 UTC: **518 destination and 120 food responsive image requests**, plus **468 pages/shortcuts and 1,010 image requests** in the complete HTTP sweep, all without failures. Editorial and planner checks pass. The browser pass covers **200 layouts**: the 13 outstanding-photo detail pages at all four target widths, all 60 food pages at 390/1440 px, and one photographed destination in each of the 14 districts at 390/1440 px. No route errors, horizontal overflow, missing expected covers, failed visible images or pending visible images remained. All nine unverified entries retain their notices and publish no map pins. Reports: `.qa/alternative-sources-browser.json`, `.qa/destination-images.json`, `.qa/food-images.json`, and `.qa/site-check.json`. These are browser viewport checks rather than physical-device testing.

Research evidence is retained in ignored `.qa/alternative-schoolwiki-browser.json`, `.qa/alternative-council-galleries.json`, `.qa/alternative-inaturalist-photos.json`, `.qa/alternative-cc-footage-metadata.json`, `.qa/final-cc-video-queries.json`, and the `footage-review-*.jpg` contact sheets. None is a selected public asset. No owner was contacted or account created.
