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
