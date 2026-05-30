# Institute of Ghost Science Terminology

This repository contains the public terminology standards used by the Institute of Ghost Science website.

The terminology is maintained as a living document. Changes should preserve stable slugs where possible so links, exports, and downstream consumers do not break unexpectedly.

## Files

- `terms.json` - canonical terminology data
- `glossary-term.ts` - TypeScript shape used by the website
- `schema/terms.schema.json` - JSON Schema for validating the data shape

## Term Shape

Each term requires:

- `term`
- `slug`
- `definition`
- `tags`

Optional fields:

- `aliases`
- `related`
- `references`
- `history`

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
