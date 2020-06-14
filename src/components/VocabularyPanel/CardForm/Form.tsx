/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Word from "../../../models/word";
import { FormField, commonFields, typeFields } from "./form-fields";
import Input from "./Input";
import Select from "./Select";
import Multiselector from "./Multiselector";

const Form = ({
  word,
  updateWord,
  save,
}: {
  word: Word;
  updateWord: (key: string, vaule: any) => void;
  save: () => void;
}) => {
  const canSave = React.useMemo(() => {
    let canSave = !!word.type;
    if (word.type) {
      for (const field of commonFields)
        canSave =
          canSave && (field.optional ? true : !!(word as any)[field.key]);
      for (const field of typeFields[word.type])
        canSave =
          canSave && (field.optional ? true : !!(word as any)[field.key]);
    }
    return canSave;
  }, [word]);

  const renderField = (type: string, field: FormField) => {
    switch (type) {
      case "input":
        return (
          <Input
            key={field.key}
            word={word}
            field={field}
            updateWord={updateWord}
          />
        );
      case "select":
        return (
          <Select
            key={field.key}
            word={word}
            field={field}
            updateWord={updateWord}
          />
        );
      case "multiselector":
        return (
          <Multiselector
            key={field.key}
            word={word}
            field={field}
            updateWord={updateWord}
          />
        );
      default:
        return null;
    }
  };

  const renderWordType = () => (
    <React.Fragment>
      <label>{"Word type"}</label>
      <select
        value={word.type || ""}
        onChange={(e) => updateWord("type", e.target.value)}
      >
        <option value="" disabled></option>
        {Object.keys(typeFields).map((key) => (
          <option key={key}>{key}</option>
        ))}
      </select>
    </React.Fragment>
  );

  return (
    <div sx={{ mb: 10, borderTop: "1px solid #ccc", pt: "20px" }}>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "max-content auto",
          columnGap: 10,
          rowGap: 10,
          alignItems: "center",
        }}
      >
        {commonFields
          .filter((field) => !field.showLast)
          .map((field) => renderField(field.type, field))}
        {renderWordType()}
        {word.type &&
          typeFields[word.type] &&
          typeFields[word.type].map((field) => renderField(field.type, field))}
        {commonFields
          .filter((field) => field.showLast)
          .map((field) => renderField(field.type, field))}
      </div>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          borderTop: "1px solid #ccc",
          mt: 20,
          pt: 20,
        }}
      >
        <button disabled={!canSave} onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};
export default Form;
