import Word, { wordTypes } from "../../../models/word";

export interface FormField {
  label: string;
  key: keyof Word;
  type: string;
  options?: string[];
  optional?: boolean;
  lookup?: boolean;
}

const commonFields: FormField[] = [
  { label: "Word", key: "word", type: "input", lookup: true },
  { label: "Hiragana", key: "hiragana", type: "input" },
  { label: "Romaji", key: "romaji", type: "input" },
  { label: "Meaning", key: "meaning", type: "multiInput" },
  {
    label: "Type",
    key: "type",
    type: "multiSelect",
    options: [...wordTypes],
  },
  {
    label: "Tags",
    key: "tags",
    type: "multiInput",
    optional: true,
  },
  { label: "Notes", key: "notes", type: "textarea", optional: true },
];

export { commonFields };
