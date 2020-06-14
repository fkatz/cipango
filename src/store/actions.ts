import {
  ADD_WORD,
  UPDATE_WORD,
  REMOVE_WORD,
  IMPORT_WORDS,
  WordAction,
} from "./types";
import Word from "../models/word";

export interface RootState {
  words: Word[];
}

const addWord = (word: Word): WordAction => {
  return {
    type: ADD_WORD,
    word,
  };
};

const updateWord = (word: Word): WordAction => {
  return {
    type: UPDATE_WORD,
    word,
  };
};

const removeWord = (word: Word): WordAction => {
  return {
    type: REMOVE_WORD,
    word,
  };
};

const importWords = (words: Word[]): WordAction => {
  return {
    type: IMPORT_WORDS,
    words,
  };
};
const Actions = { addWord, removeWord, updateWord, importWords };
export default Actions;
