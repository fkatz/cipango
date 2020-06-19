/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Word from "../../../models/word";
import { FormField } from "./form-fields";

const Textarea = ({
  word,
  field,
  updateWord,
}: {
  word: Word;
  field: FormField;
  updateWord: (key: keyof Word, vaule: string) => void;
}) => {
  const [value, setValue] = React.useState(word[field.key] || "");
  React.useEffect(() => {
    setValue(word[field.key] || "");
  }, [word, field.key]);
  return (
    <React.Fragment>
      <label>{field.label}</label>
      <textarea
        sx={{ minWidth: 0, width: "100%", resize: "vertical" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateWord(field.key, e.target.value)}
      />
    </React.Fragment>
  );
};
export default Textarea;
