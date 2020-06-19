/** @jsx jsx */
import { jsx } from "theme-ui";
import Word from "../../models/word";
import React from "react";

const Card = ({
  children,
  word,
  onClick,
  ...restProps
}: {
  children?: React.ReactNode;
  word?: Partial<Word>;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      sx={{
        width: "100%",
        height: "100%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: "3px",
        color: "primary",
        ":hover": { borderColor: "#000", color: "#000" },
        outlineColor: "#000",
        position: "relative",
        overflow: "hidden",
        transition: "0.5s",
        userSelect: "none",
      }}
      {...restProps}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {children}
        {word && (
          <React.Fragment>
            <h1
              sx={{
                p: 0,
                m: 0,
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {word.word}
            </h1>
            {word.hiragana && word.hiragana !== word.word && (
              <div
                sx={{
                  fontSize: "18px",
                  fontFamily: "arial, sans-serif",
                  textAlign: "center",
                }}
              >
                {word.hiragana}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Card;
