/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Word from "../../../models/word";
import { FormField } from "./form-fields";

const Input = ({
  word,
  field,
  updateWord,
}: {
  word: Word;
  field: FormField;
  updateWord: (key: string, vaule: string) => void;
}) => (
  <React.Fragment>
    <label>{field.label}</label>
    <input
      sx={{ minWidth: 0, width: "100%" }}
      value={(word as any)[field.key] || ""}
      onChange={(e) => updateWord(field.key, e.target.value)}
    />
  </React.Fragment>
);
export default Input;
