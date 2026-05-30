# Institute of Ghost Science Terminology

This repository contains the public terminology standards used by the Institute of Ghost Science.

The terminology is maintained as a living document. Changes should preserve stable slugs where possible so links, exports, and downstream consumers do not break unexpectedly.

## Files

- `terms.json` - canonical terminology data
- `glossary-term.ts` - TypeScript shape used by the website
- `VERSION_HISTORY.md` - version notes for public terminology releases
- `schema/terms.schema.json` - JSON Schema for validating the data shape

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

## Validation

Run the structural validator before committing terminology changes:

```sh
node scripts/validate-terms.mjs
```
