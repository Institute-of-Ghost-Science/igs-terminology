import { readFileSync, readdirSync } from 'node:fs';

const problems = [];

const files = [
  new URL('../terms.json', import.meta.url),
  ...readdirSync(new URL('../versions/', import.meta.url), { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => new URL(`../versions/${entry.name}/terms.json`, import.meta.url)),
];

for (const file of files) {
  validateTerminologyFile(file);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`${files.length} terminology files checked.`);
console.log('No structural problems found.');

function validateTerminologyFile(file) {
  const labelPrefix = file.pathname.endsWith('/terms.json') ? file.pathname : String(file);
  const data = JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
  const metadata = data?.metadata;
  const terms = data?.terms;
  const slugs = new Set();
  const termNames = new Set();

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    problems.push(`${labelPrefix}: terms.json must contain an object.`);
    return;
  }

  for (const field of ['metadata', 'terms']) {
    if (!(field in data)) {
      problems.push(`${labelPrefix}: missing ${field}.`);
    }
  }

  if (!Array.isArray(terms)) {
    problems.push(`${labelPrefix}: terms must be an array.`);
    return;
  }

  for (const term of terms) {
    if (typeof term.term === 'string') {
      const normalizedTerm = term.term.trim().toLowerCase();

      if (termNames.has(normalizedTerm)) {
        problems.push(`${labelPrefix}: ${term.term}: duplicate term name.`);
      }

      termNames.add(normalizedTerm);
    }
  }

  for (const [index, term] of terms.entries()) {
    const label = term?.term || `Term at index ${index}`;

    for (const field of ['term', 'slug', 'definition', 'tags', 'versionAdded', 'versionUpdated']) {
      if (!(field in term)) {
        problems.push(`${labelPrefix}: ${label}: missing ${field}.`);
      }
    }

    if (typeof term.slug === 'string') {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(term.slug)) {
        problems.push(`${labelPrefix}: ${label}: slug must be lowercase kebab-case.`);
      }

      if (slugs.has(term.slug)) {
        problems.push(`${labelPrefix}: ${label}: duplicate slug "${term.slug}".`);
      }

      slugs.add(term.slug);
    }

    if (!Array.isArray(term.tags) || term.tags.length === 0) {
      problems.push(`${labelPrefix}: ${label}: tags must be a non-empty array.`);
    }

    for (const field of ['versionAdded', 'versionUpdated']) {
      if (typeof term[field] === 'string' && !/^\d+\.\d+\.\d+$/.test(term[field])) {
        problems.push(`${labelPrefix}: ${label}: ${field} must use semantic version format, such as 0.1.0.`);
      }
    }

    for (const field of ['aliases', 'related']) {
      if (field in term && !Array.isArray(term[field])) {
        problems.push(`${labelPrefix}: ${label}: ${field} must be an array when present.`);
      }
    }

    if (Array.isArray(term.related)) {
      for (const relatedTerm of term.related) {
        if (!termNames.has(String(relatedTerm).trim().toLowerCase())) {
          problems.push(`${labelPrefix}: ${label}: related term "${relatedTerm}" does not match a term name.`);
        }
      }
    }
  }

  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    problems.push(`${labelPrefix}: metadata must contain an object.`);
    return;
  }

  for (const field of ['version', 'released', 'author', 'repositoryUrl', 'license', 'licenseUrl', 'schemaVersion', 'termCount']) {
    if (!(field in metadata)) {
      problems.push(`${labelPrefix}: metadata missing ${field}.`);
    }
  }

  for (const field of ['version', 'schemaVersion']) {
    if (typeof metadata[field] === 'string' && !/^\d+\.\d+\.\d+$/.test(metadata[field])) {
      problems.push(`${labelPrefix}: metadata ${field} must use semantic version format, such as 0.4.0.`);
    }
  }

  if (typeof metadata.released === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(metadata.released)) {
    problems.push(`${labelPrefix}: metadata released must use YYYY-MM-DD format.`);
  }

  for (const field of ['repositoryUrl', 'licenseUrl']) {
    if (typeof metadata[field] === 'string' && !/^https?:\/\//.test(metadata[field])) {
      problems.push(`${labelPrefix}: metadata ${field} must be an HTTP(S) URL.`);
    }
  }

  if (!Number.isInteger(metadata.termCount)) {
    problems.push(`${labelPrefix}: metadata termCount must be an integer.`);
  } else if (metadata.termCount !== terms.length) {
    problems.push(`${labelPrefix}: metadata termCount is ${metadata.termCount}, expected ${terms.length}.`);
  }
}
