import Word from "../models/word";
import Filter from "../models/filter";

export const getFilteredWords = (
  words: Word[],
  filters: Filter,
  blackListed?: Word[] | null
) => {
  let filteredWords = words;
  if (filters.types && filters.types.length > 0)
    filteredWords = filteredWords.filter((word) =>
      filters.types?.some((type) => word.type.includes(type))
    );
  if (filters.tags && filters.tags.length > 0)
    filteredWords = filteredWords.filter(
      (word) =>
        word.tags && word.tags.some((tag) => filters.tags?.includes(tag))
    );
  if (blackListed && blackListed.length > 0)
    filteredWords = filteredWords.filter(
      (word) =>
        !blackListed.some(
          (blWord) =>
            blWord.word === word.word && blWord.hiragana === word.hiragana
        )
    );
  return filteredWords;
};
