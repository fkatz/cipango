/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Word from "../../../models/word";
import { FormField, commonFields } from "./form-fields";
import Input from "./Input";
import Select from "./Select";
import MultiInput from "./MultiInput";
import jishoLookUp from "../../../services/jishoLookUp";
import MultiSelect from "./MultiSelect";

const Form = ({
  word,
  updateWord,
  save,
}: {
  word: Word;
  updateWord: (key: keyof Word, value: any) => void;
  save: () => void;
}) => {
  const canSave = React.useMemo(() => {
    let canSave = !!word.type;
    if (word.type) {
      for (const field of commonFields)
        canSave =
          canSave &&
          (field.optional
            ? true
            : !!word[field.key] &&
              (Array.isArray(word[field.key])
                ? word[field.key]!.length > 0
                : true));
    }
    return canSave;
  }, [word]);

  const [doLookUp, setDoLookUp] = React.useState(false);

  /*React.useEffect(() => {
    const lookUp = async () => {
      const result = await jishoLookUp(word.word);
      setDoLookUp(false);
      updateWord("meaning", result.meaning);
      updateWord("hiragana", result.hiragana);
    };
    if (doLookUp) {
      lookUp();
    }
  }, [doLookUp, updateWord, word.word]);*/

  const lookup = (key: keyof Word, value: any) => {
    setDoLookUp(true);
    console.log("entro");
    updateWord(key, value);
  };

  const renderField = (type: string, field: FormField) => {
    const props = {
      key: field.key,
      word: word,
      field: field,
      updateWord: field.lookup ? lookup : updateWord,
    };
    switch (type) {
      case "input":
        return <Input {...props} />;
      case "select":
        return <Select {...props} />;
      case "multiInput":
        return <MultiInput {...props} />;
      case "multiSelect":
        return <MultiSelect {...props} options={field.options!} />;
      default:
        return null;
    }
  };

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
        {commonFields.map((field) => renderField(field.type, field))}
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
