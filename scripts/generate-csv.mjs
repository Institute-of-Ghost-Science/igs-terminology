import { readFileSync, writeFileSync } from 'node:fs';

const terminology = JSON.parse(readFileSync(new URL('../terms.json', import.meta.url), 'utf8'));
const terms = terminology.terms;

if (!Array.isArray(terms)) {
  throw new Error('terms.json must contain a terms array.');
}

const rows = [
  ['term', 'definition'],
  ...terms.map(term => [term.term, term.definition]),
];

const csv = rows.map(row => row.map(csvCell).join(',')).join('\r\n');

writeFileSync(new URL('../terms.csv', import.meta.url), `${csv}\r\n`);

console.log(`Generated terms.csv with ${terms.length} terms.`);

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}
