export const wordTypes = [
  "noun",
  "pronoun",
  "-ru verb",
  "-u verb",
  "transitive verb",
  "intransitive verb",
  "-i adjective",
  "-na adjective",
  "number",
] as const;

export type WordType = typeof wordTypes[number];

export default interface Word {
  word: string;
  hiragana: string;
  romaji: string;
  meaning: string[];
  type: WordType[];
  tags?: string[];
  notes?: string;
}
