/** @jsx jsx */
import { jsx } from "theme-ui";
import Word from "../../models/word";
import React from "react";
import { ReactComponent as CrossIcon } from "../../images/cross.svg";
import { ReactComponent as PencilIcon } from "../../images/pencil.svg";
import Filter from "../../models/filter";

const Card = ({
  word,
  setEditingWord,
  removeWord,
  setFilters,
  ...restProps
}: {
  word: Word;
  setEditingWord: (word: Word) => void;
  removeWord: (word: Word) => void;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  const [selected, setSelected] = React.useState(false);
  const border = "1px solid #ccc";
  const toggleTag = (tag: string) => {
    if (selected) {
      setFilters((filters) =>
        filters.tags?.includes(tag)
          ? { ...filters, tags: filters.tags.filter((tagIn) => tagIn !== tag) }
          : { ...filters, tags: [tag] }
      );
    }
  };
  return (
    <div
      tabIndex={0}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      sx={{
        width: 200,
        minHeight: 250,
        height: "100%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: selected ? "#000" : "#ccc",
        borderRadius: "3px",
        color: selected ? "#000" : "primary",
        ":hover": { borderColor: "#000", color: "#000" },
        outlineColor: "#000",
        position: "relative",
        overflow: "hidden",
        transition: "0.5s",
      }}
      {...restProps}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div sx={{ px: 20, py: 30, flexGrow: 1 }}>
          <h1 sx={{ p: 0, m: 0, textAlign: "center", fontWeight: 400 }}>
            {word.word}
          </h1>
        </div>
        <div
          sx={{
            borderTop: border,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            sx={{
              px: 20,
              py: 10,
              borderRight: border,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            <div>{`${
              word.subtype ? word.subtype + " " : ""
            }${word.type.toLowerCase()}`}</div>
          </div>
          <div
            sx={{
              px: 20,
              py: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              fontStyle: "italic",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            {word.meaning}
          </div>
        </div>
        {word.tags && (
          <div
            sx={{
              borderTop: border,
              p: "2px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {word.tags &&
              word.tags.map((tag) => (
                <div
                  key={tag}
                  sx={{
                    border: "1px solid #ccc",
                    color: "muted",
                    padding: "5px",
                    margin: "2px",
                    fontSize: "10px",
                    borderRadius: "3px",
                    userSelect: "none",
                    transition: "0.2s",
                    ":hover": {
                      borderColor: "secondary",
                      color: "secondary",
                    },
                  }}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </div>
              ))}
          </div>
        )}
        {word.hiragana && (
          <div
            sx={{
              px: "5px",
              py: "15px",
              borderTop: border,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              fontFamily: "arial, sans-serif",
            }}
          >
            {word.hiragana}
          </div>
        )}
      </div>
      <div
        sx={{
          position: "absolute",
          top: "-2px",
          right: 0,
          p: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          opacity: selected ? 1 : 0,
          transition: "0.2s",
          pointerEvents: selected ? "all" : "none",
        }}
      >
        <div onClick={() => removeWord(word)}>
          <CrossIcon />
        </div>
        <div
          sx={{
            mt: 1,
            ml: "2px",
          }}
          onClick={() => setEditingWord(word)}
        >
          <PencilIcon
            sx={{
              width: 15,
              path: { fill: "primary" },
              "*:hover $": { path: { fill: "secondary" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
