export const wordTypes = ["Adjective", "Noun", "Pronoun", "Verb"];
export const adjectiveSubtypes = ["-i", "-na"];
export const verbSubtypes = ["-u", "-ru", "irregular"];

export default interface Word {
  word: string;
  hiragana?: string;
  romaji: string;
  meaning: string;
  type: string;
  subtype?: string;
  tags?: string[];
}
