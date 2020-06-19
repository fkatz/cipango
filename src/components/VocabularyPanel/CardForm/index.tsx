/** @jsx jsx */
import { jsx } from "theme-ui";

import React from "react";
import { VocabularyContext } from "../../../contexts/VocabularyContext";
import Word from "../../../models/word";
import Form from "./Form";
import { useStore } from "react-redux";
import Actions from "../../../store/actions";

const CardForm = ({ onSave }: { onSave?: () => void }) => {
  const { selectedWord } = React.useContext(VocabularyContext);
  const [wordState, setWordState] = React.useState({} as Word);
  const [error, setError] = React.useState("");
  const store = useStore();
  React.useEffect(() => {
    setWordState(selectedWord || ({} as Word));
  }, [selectedWord]);

  const save = () => {
    if (wordState.type) {
      const newWord = wordState;
      if (newWord) {
        try {
          if (selectedWord) {
            store.dispatch(Actions.updateWord(newWord));
          } else {
            store.dispatch(Actions.addWord(newWord));
          }
          if (onSave) onSave();
          setWordState({} as Word);
          setError("");
        } catch (error) {
          setError(error.message);
        }
      }
    }
  };

  const setWord = (key: keyof Word, value: any) =>
    setWordState({ ...wordState, [key]: value });

  return (
    <div>
      {error ? <div sx={{ color: "error", mb: 2 }}>Error: {error}</div> : null}
      <Form word={wordState} updateWord={setWord} save={save} />
    </div>
  );
};

export default CardForm;
