import { adjectiveSubtypes, verbSubtypes } from "../../../models/word";

export interface FormField {
  label: string;
  key: string;
  type: string;
  options?: string[];
  optional?: boolean;
  showLast?: boolean;
}

const commonFields: FormField[] = [
  { label: "Word", key: "word", type: "input" },
  { label: "Hiragana", key: "hiragana", type: "input", optional: true },
  { label: "Meaning", key: "meaning", type: "input" },
  { label: "Romaji", key: "romaji", type: "input" },
  {
    label: "Tags",
    key: "tags",
    type: "multiselector",
    optional: true,
    showLast: true,
  },
];

const typeFields: { [key: string]: FormField[] } = {
  Noun: [],
  Pronoun: [],
  Adjective: [
    {
      label: "Adjective type",
      key: "subtype",
      type: "select",
      options: adjectiveSubtypes,
    },
  ],
  Verb: [
    {
      label: "Verb type",
      key: "subtype",
      type: "select",
      options: verbSubtypes,
    },
  ],
};

export { commonFields, typeFields };
