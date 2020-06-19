/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Word from "../../../models/word";
import { FormField } from "./form-fields";

const MultiInput = ({
  word,
  field,
  updateWord,
}: {
  word: Word;
  field: FormField;
  updateWord: (key: keyof Word, vaule: string[]) => void;
}) => {
  const [currentString, setCurrentString] = React.useState("");
  const elements = ((word as any)[field.key] as string[]) || [];
  const add = () => {
    const lowerString = currentString && currentString.toLowerCase();
    if (lowerString && !elements.includes(lowerString)) {
      updateWord(field.key, [...elements, lowerString]);
      setCurrentString("");
    }
  };
  const remove = (element: string) =>
    updateWord(
      field.key,
      elements.filter((elementIn) => elementIn !== element)
    );
  return (
    <React.Fragment>
      <label>{field.label}</label>
      {elements && elements.length > 0 && (
        <React.Fragment>
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {elements.map((element) => (
              <div
                key={element}
                sx={{
                  mr: 2,
                  my: 1,
                  background: (theme) => theme.colors.primary,
                  transition: "0.2s",
                  "&:hover": {
                    background: (theme) => theme.colors.secondary,
                  },
                  color: "white",
                  py: "10px",
                  pl: "10px",
                  fontSize: "12px",
                  userSelect: "none",
                }}
              >
                {element}
                <span
                  sx={{
                    opacity: 0.8,
                    right: 0,
                    p: "10px",
                    ml: "5px",
                  }}
                  onClick={() => remove(element)}
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <div></div>
        </React.Fragment>
      )}
      <div sx={{ display: "flex", flexDirection: "row", minWidth: 0 }}>
        <input
          value={currentString}
          onChange={(e) => setCurrentString(e.target.value)}
          onKeyPress={(e) => {
            if (e.charCode === 13) add();
          }}
          sx={{ minWidth: 0, mr: 2, flexGrow: 1 }}
        />
        <button onClick={add}>Add</button>
      </div>
    </React.Fragment>
  );
};
export default MultiInput;
