export interface TerminologyData {
  metadata: TerminologyMetadata;
  terms: GlossaryTerm[];
}

export interface TerminologyMetadata {
  version: string;
  released: string;
  author: string;
  repositoryUrl: string;
  license: string;
  licenseUrl: string;
  schemaVersion: string;
  termCount: number;
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  tags: string[];
  versionAdded: string;
  versionUpdated: string;
  aliases?: string[];
  related?: string[];
  references?: GlossaryReference[];
}

export interface GlossaryReference {
  label: string;
  url?: string;
}
