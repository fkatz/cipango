/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Word from "../../../models/word";
import { FormField } from "./form-fields";

const Select = ({
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
    <select
      value={(word as any)[field.key] || ""}
      onChange={(e) => updateWord(field.key, e.target.value)}
    >
      <option value="" disabled></option>
      {field.options?.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </React.Fragment>
);
export default Select;
