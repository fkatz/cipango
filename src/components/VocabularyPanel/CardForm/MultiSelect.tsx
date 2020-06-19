/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Word from "../../../models/word";
import { FormField } from "./form-fields";

const MultiSelect = ({
  word,
  field,
  options,
  updateWord,
}: {
  word: Word;
  field: FormField;
  options: string[];
  updateWord: (key: keyof Word, value: string[]) => void;
}) => {
  const selectedElements = ((word as any)[field.key] as string[]) || [];
  const toggle = (element: string) => {
    const elements = word[field.key] as string[] | undefined;
    let newElements;
    if (!elements) {
      newElements = [element];
    } else if (!elements.includes(element)) {
      newElements = [...elements, element];
    } else {
      newElements = elements.filter(
        (elementInside) => elementInside !== element
      );
    }
    updateWord(field.key, newElements);
  };
  return (
    <React.Fragment>
      <label>{field.label}</label>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {options.map((option) => (
          <div
            key={option}
            sx={{
              mr: 2,
              my: 1,
              background: (theme) =>
                selectedElements.includes(option)
                  ? theme.colors.primary
                  : theme.colors.muted,
              transition: "0.2s",
              "&:hover": {
                background: (theme) => theme.colors.secondary,
              },
              color: "white",
              p: "10px",
              userSelect: "none",
              fontSize: "12px",
              textAlign: "center",
            }}
            onClick={() => toggle(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
export default MultiSelect;
