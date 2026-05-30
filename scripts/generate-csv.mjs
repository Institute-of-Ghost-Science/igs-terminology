import { readFileSync, writeFileSync } from 'node:fs';

const terms = JSON.parse(readFileSync(new URL('../terms.json', import.meta.url), 'utf8'));
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
