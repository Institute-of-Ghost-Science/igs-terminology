export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  tags: string[];
  aliases?: string[];
  related?: string[];
  references?: GlossaryReference[];
  history?: GlossaryHistory;
}

export interface GlossaryReference {
  label: string;
  url?: string;
}

export interface GlossaryHistory {
  added: string;
  updated?: string;
}
