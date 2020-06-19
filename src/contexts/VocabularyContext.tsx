import React from "react";
import Word from "../models/word";
import Filter from "../models/filter";

const VocabularyContext = React.createContext(
  {} as {
    editModalOpen: boolean;
    setEditModalOpen: (open: boolean) => void;
    detailModalOpen: boolean;
    setDetailModalOpen: (open: boolean) => void;
    selectedWord: null | Word;
    setSelectedWord: (word: null | Word) => void;
    fieldVisibility: { [key: string]: boolean };
    setFieldVisibility: React.Dispatch<
      React.SetStateAction<{
        [key: string]: boolean;
      }>
    >;
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  }
);

const VocabularyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedWord, setSelectedWord] = React.useState(null as null | Word);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [fieldVisibility, setFieldVisibility] = React.useState(
    {} as { [key: string]: boolean }
  );
  const [filters, setFilters] = React.useState({} as Filter);
  return (
    <VocabularyContext.Provider
      value={{
        selectedWord,
        setSelectedWord,
        editModalOpen,
        setEditModalOpen,
        detailModalOpen,
        setDetailModalOpen,
        fieldVisibility,
        setFieldVisibility,
        filters,
        setFilters,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
};

export { VocabularyContext, VocabularyContextProvider };
