import Word from "../models/word";
import { Action } from "redux";

export const ADD_WORD = "ADD_WORD";
export const UPDATE_WORD = "UPDATE_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const IMPORT_WORDS = "IMPORT_WORDS";

interface AddWordAction extends Action<typeof ADD_WORD> {
  word: Word;
}

interface UpdateWordAction extends Action<typeof UPDATE_WORD> {
  word: Word;
}

interface RemoveWordAction extends Action<typeof REMOVE_WORD> {
  word: Word;
}

interface ImportWordsAction extends Action<typeof IMPORT_WORDS> {
  words: Word[];
}

export type WordAction =
  | AddWordAction
  | UpdateWordAction
  | RemoveWordAction
  | ImportWordsAction;
