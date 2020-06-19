/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Card from "./Card";
import { ReactComponent as PlusIcon } from "../../images/plus.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/actions";
import { getFilteredWords } from "../../helpers";

const CardList = () => {
  const {
    setSelectedWord,
    setEditModalOpen,
    setDetailModalOpen,
    filters,
  } = React.useContext(VocabularyContext);
  const words = useSelector((state: RootState) => state.words);
  const filteredWords = React.useMemo(() => getFilteredWords(words, filters), [
    words,
    filters,
  ]);

  const defaultSize = { width: "250px", height: "160px" };
  return (
    <div
      sx={{
        m: ["10px", "10px", "20px"],
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, ${defaultSize.width})`,
        gridTemplateRows: `repeat(auto-fill, ${defaultSize.height})`,
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      {
        <div sx={{ ...defaultSize }}>
          <Card
            onClick={() => {
              setSelectedWord(null);
              setEditModalOpen(true);
            }}
          >
            <PlusIcon
              sx={{
                height: 50,
                width: 50,
                transition: "0.5s",
                path: {
                  fill: "#888",
                  transition: "0.5s",
                },
                "*:hover>*>&,*:active>*>&": { path: { fill: "#000" } },
              }}
            />
          </Card>
        </div>
      }
      {filteredWords.map((word) => (
        <div sx={{ ...defaultSize }}>
          <Card
            key={word.word}
            word={word}
            onClick={() => {
              setSelectedWord(word);
              setDetailModalOpen(true);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
