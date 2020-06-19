import Word from "../models/word";
import Filter from "../models/filter";

export const getFilteredWords = (words: Word[], filters: Filter) => {
  return words
    .filter((word) =>
      filters.types && filters.types.length > 0
        ? filters.types?.some((type) => word.type.includes(type))
        : true
    )
    .filter((word) =>
      filters.tags && filters.tags.length > 0
        ? word.tags && word.tags.some((tag) => filters.tags?.includes(tag))
        : true
    );
};
