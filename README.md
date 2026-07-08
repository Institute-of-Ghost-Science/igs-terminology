# Institute of Ghost Science Terminology

This repository contains the public terminology standards used by the Institute of Ghost Science.

The terminology is maintained as a living document. Changes should preserve stable slugs where possible so links, exports, and downstream consumers do not break unexpectedly.

## Files

- `terms.json` - canonical terminology data
- `terms.csv` - term-and-definition export
- `glossary-term.ts` - TypeScript shape used by the website
- `versions/` - archived terminology releases
- `VERSION_HISTORY.md` - version notes for public terminology releases
- `schema/terms.schema.json` - JSON Schema for validating the data shape

## Metadata

The `metadata` object in `terms.json` describes the current terminology release:

- `version` - the current terminology release version.
- `released` - the release date in `YYYY-MM-DD` format.
- `author` - the organization that publishes the terminology.
- `repositoryUrl` - the canonical GitHub repository for the terminology data.
- `license` - the short license identifier.
- `licenseUrl` - the canonical license URL.
- `schemaVersion` - the metadata/data schema version used by this release.
- `termCount` - the number of terms in `terms`.

## Data Shape

The canonical `terms.json` file contains both release metadata and the term list:

```json
{
  "metadata": {
    "version": "0.10.0",
    "released": "2026-07-08",
    "author": "Institute of Ghost Science",
    "repositoryUrl": "https://github.com/Institute-of-Ghost-Science/igs-terminology",
    "license": "CC BY-NC 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
    "schemaVersion": "2.0.0",
    "termCount": 99
  },
  "terms": []
}
```

## Term Shape

Each item in `terms` requires:

- `term` - the display name for the concept.
- `slug` - a stable lowercase kebab-case identifier for links, exports, and references.
- `definition` - the Institute of Ghost Science meaning for the term.
- `tags` - reusable labels that group the term by role, category, or usage.
- `versionAdded` - the terminology version where the term first appeared.
- `versionUpdated` - the terminology version where the term was last revised, including changes to tags, aliases, related terms, references, or definition text.

Optional fields:

- `aliases` - alternate names, abbreviations, spellings, or common variants.
- `related` - exact term names that connect this term to nearby concepts.
- `references` - source labels and optional URLs that support or contextualize the term.

The `terms` array is kept alphabetized by term name. Within each term, `tags`,
`aliases`, and `related` are also kept alphabetized.

## Approval Workflow

New terms must be proposed before editing release data. Each term should be reviewed and manually approved by the maintainer before it is added to `terms.json`, `terms.csv`, version archives, release metadata, or website terminology data. Do not treat a suggested draft, brainstormed list, or inferred expansion area as approval to add terms.

## Slug Guidance

Use lowercase kebab-case slugs:

```text
electronic-voice-phenomenon
baseline-reading
false-positive
```

Avoid renaming an existing slug unless the term itself is being intentionally replaced.

## Website Usage

The website consumes this repository as its terminology source. Consumers should read the glossary entries from the `terms` array in the root `terms.json` file.

## Previous Versions

Previous terminology releases are archived in `versions/`:

- `versions/0.1.1/`
- `versions/0.2.1/`
- `versions/0.3.1/`
- `versions/0.4.1/`
- `versions/0.5.1/`
- `versions/0.6.0/`
- `versions/0.7.0/`
- `versions/0.7.1/`
- `versions/0.7.2/`
- `versions/0.7.3/`
- `versions/0.7.4/`
- `versions/0.8.0/`
- `versions/0.9.0/`

Each archived release includes `terms.json` with embedded metadata and `terms.csv`. The root files represent the current release.

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
