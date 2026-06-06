# Institute of Ghost Science Terminology

This repository contains the public terminology standards used by the Institute of Ghost Science.

The terminology is maintained as a living document. Changes should preserve stable slugs where possible so links, exports, and downstream consumers do not break unexpectedly.

## Files

- `terms.json` - canonical terminology data
- `terms.csv` - term-and-definition export
- `metadata.json` - release metadata for the terminology data
- `glossary-term.ts` - TypeScript shape used by the website
- `versions/` - archived terminology releases
- `VERSION_HISTORY.md` - version notes for public terminology releases
- `schema/terms.schema.json` - JSON Schema for validating the data shape

## Metadata

The `metadata.json` file describes the current terminology release:

- `version` - the current terminology release version.
- `released` - the release date in `YYYY-MM-DD` format.
- `license` - the short license identifier.
- `licenseUrl` - the canonical license URL.
- `schemaVersion` - the metadata/data schema version used by this release.
- `termCount` - the number of terms in `terms.json`.

## Term Shape

Each term requires:

- `term` - the display name for the concept.
- `slug` - a stable lowercase kebab-case identifier for links, exports, and references.
- `definition` - the Institute of Ghost Science meaning for the term.
- `tags` - reusable labels that group the term by role, category, or usage.
- `versionAdded` - the terminology version where the term first appeared.
- `versionUpdated` - the terminology version where the term was last revised.

Optional fields:

- `aliases` - alternate names, abbreviations, spellings, or common variants.
- `related` - exact term names that connect this term to nearby concepts.
- `references` - source labels and optional URLs that support or contextualize the term.

## Slug Guidance

Use lowercase kebab-case slugs:

```text
electronic-voice-phenomenon
baseline-reading
false-positive
```

Avoid renaming an existing slug unless the term itself is being intentionally replaced.

## Website Usage

The website consumes this repository as its terminology source. The website currently expects `terms.json` and `glossary-term.ts` to remain at the repository root.

## Previous Versions

Previous terminology releases are archived in `versions/`:

- `versions/0.1.0/`
- `versions/0.2.0/`
- `versions/0.3.0/`

Each archived release includes `terms.json`, `terms.csv`, and `metadata.json`. The root files represent the current release.

## License

The terminology is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.

## Validation

Run the structural validator before committing terminology changes:

```sh
node scripts/validate-terms.mjs
```

Regenerate the CSV export after changing `terms.json`:

```sh
node scripts/generate-csv.mjs
```
