import { readFileSync } from 'node:fs';

const terms = JSON.parse(readFileSync(new URL('../terms.json', import.meta.url), 'utf8'));
const problems = [];
const slugs = new Set();
const termNames = new Set();

if (!Array.isArray(terms)) {
  problems.push('terms.json must contain an array.');
} else {
  for (const term of terms) {
    if (typeof term.term === 'string') {
      const normalizedTerm = term.term.trim().toLowerCase();

      if (termNames.has(normalizedTerm)) {
        problems.push(`${term.term}: duplicate term name.`);
      }

      termNames.add(normalizedTerm);
    }
  }

  for (const [index, term] of terms.entries()) {
    const label = term?.term || `Term at index ${index}`;

    for (const field of ['term', 'slug', 'definition', 'tags', 'versionAdded', 'versionUpdated']) {
      if (!(field in term)) {
        problems.push(`${label}: missing ${field}.`);
      }
    }

    if (typeof term.slug === 'string') {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(term.slug)) {
        problems.push(`${label}: slug must be lowercase kebab-case.`);
      }

      if (slugs.has(term.slug)) {
        problems.push(`${label}: duplicate slug "${term.slug}".`);
      }

      slugs.add(term.slug);
    }

    if (!Array.isArray(term.tags) || term.tags.length === 0) {
      problems.push(`${label}: tags must be a non-empty array.`);
    }

    for (const field of ['versionAdded', 'versionUpdated']) {
      if (typeof term[field] === 'string' && !/^\d+\.\d+\.\d+$/.test(term[field])) {
        problems.push(`${label}: ${field} must use semantic version format, such as 0.1.0.`);
      }
    }

    for (const field of ['aliases', 'related']) {
      if (field in term && !Array.isArray(term[field])) {
        problems.push(`${label}: ${field} must be an array when present.`);
      }
    }

    if (Array.isArray(term.related)) {
      for (const relatedTerm of term.related) {
        if (!termNames.has(String(relatedTerm).trim().toLowerCase())) {
          problems.push(`${label}: related term "${relatedTerm}" does not match a term name.`);
        }
      }
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`${terms.length} terms checked.`);
console.log('No structural problems found.');
