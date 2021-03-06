import Word from "../../models/word";
import {
  WordAction,
  ADD_WORD,
  UPDATE_WORD,
  IMPORT_WORDS,
  REMOVE_WORD,
} from "../types";

export class WordRepeatedError extends Error {
  constructor(word: string, hiragana?: string) {
    super(
      `The word "${word}${hiragana ? ` (${hiragana})` : ""}" already exists`
    );
    this.name = "WordRepeatedError";
  }
}

export class WordDoesNotExistError extends Error {
  constructor(word: string, hiragana?: string) {
    super(
      `The word "${word}${hiragana ? ` (${hiragana})` : ""}" does not exist`
    );
    this.name = "WordDoesNotExistError";
  }
}

const localStorageKey = "words";

const localStorageWordsJSON = localStorage.getItem(localStorageKey);
const initialWords = (localStorageWordsJSON
  ? JSON.parse(localStorageWordsJSON)
  : []) as Word[];

const wordsReducerInternal = (words = initialWords, action: WordAction) => {
  if (action.type === ADD_WORD) {
    if (
      words.some(
        (word) =>
          word.word === action.word.word &&
          word.hiragana === action.word.hiragana
      )
    )
      throw new WordRepeatedError(action.word.word, action.word.hiragana);
    return [...words, action.word];
  }
  if (action.type === UPDATE_WORD) {
    if (
      !words.some(
        (word) =>
          word.word === action.word.word &&
          word.hiragana === action.word.hiragana
      )
    )
      throw new WordDoesNotExistError(action.word.word, action.word.hiragana);
    return words.map((word) =>
      word.word === action.word.word && word.hiragana === action.word.hiragana
        ? action.word
        : word
    );
  }
  if (action.type === REMOVE_WORD) {
    if (
      !words.some(
        (word) =>
          word.word === action.word.word &&
          word.hiragana === action.word.hiragana
      )
    )
      throw new WordDoesNotExistError(action.word.word, action.word.hiragana);
    return words.filter(
      (word) =>
        word.word !== action.word.word || word.hiragana !== action.word.hiragana
    );
  }
  if (action.type === IMPORT_WORDS) {
    return action.words;
  }
  return words;
};

const setLocalStorage = (fn: (...args: any) => any, key: string) => (
  ...args: any
) => {
  const value = fn(...args);
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

const wordsReducer = setLocalStorage(
  wordsReducerInternal,
  "words"
) as typeof wordsReducerInternal;

export { wordsReducer };
