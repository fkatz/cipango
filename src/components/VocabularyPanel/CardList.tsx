/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Card from "./Card";
import Word from "../../models/word";
import plusIcon from "../../images/plus.svg";
import { useSelector, useStore } from "react-redux";
import Actions, { RootState } from "../../store/actions";
import { getFilteredWords } from "../../helpers";

const CardList = () => {
  const {
    setEditingWord,
    setEditModalOpen,
    filters,
    setFilters,
  } = React.useContext(VocabularyContext);
  const words = useSelector((state: RootState) => state.words);
  const store = useStore();
  const removeWord = (word: Word) => {
    try {
      store.dispatch(Actions.removeWord(word));
    } catch (error) {
      console.error(error);
    }
  };
  const filteredWords = React.useMemo(() => getFilteredWords(words, filters), [
    words,
    filters,
  ]);

  const renderNewCard = () => (
    <div
      onClick={() => {
        setEditingWord(null);
        setEditModalOpen(true);
      }}
      tabIndex={0}
      sx={{
        border: "1px solid #ccc",
        "&:hover,&:active": { borderColor: "#000", outlineColor: "#000" },
        width: 200,
        minHeight: 250,
        height: "100%",
        transition: "0.5s",
        borderRadius: "3px",
      }}
    >
      <div
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt=""
          src={plusIcon}
          sx={{
            height: 50,
            opacity: 0.6,
            transition: "0.5s",
            "*:hover>*>&,*:active>*>&": { opacity: 1 },
          }}
        />
      </div>
    </div>
  );
  return (
    <div
      sx={{
        m: ["10px", "10px", "20px"],
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      {renderNewCard()}
      {filteredWords.map((word) => (
        <Card
          key={word.word}
          word={word}
          removeWord={removeWord}
          setEditingWord={(word: Word) => {
            setEditingWord(word);
            setEditModalOpen(true);
          }}
          setFilters={setFilters}
        />
      ))}
    </div>
  );
};

export default CardList;
