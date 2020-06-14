/** @jsx jsx */
import { jsx } from "theme-ui";
import QuestionModel from "../../models/question";
import GameMode from "../../models/game-mode";
import React from "react";

const Question = ({
  question,
  gameMode,
  nextTurn,
}: {
  question: QuestionModel;
  gameMode: GameMode;
  nextTurn: (answer: string) => void;
}) => {
  const renderAnswers = () => (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns:
          question.answers?.length === 3
            ? "1fr 1fr 1fr"
            : ["1fr 1fr", "1fr 1fr 1fr 1fr"],
        columnGap: "10px",
        rowGap: "10px",
      }}
    >
      {question.answers?.map((answer) => (
        <button
          key={answer}
          sx={{
            background: "transparent",
            border: "1px solid #ccc",
            color: "text",
            fontSize: gameMode.romajiAnswers ? "18px" : "24px",
            mr: [0, 2],
            ":last-of-type": { mr: 0 },
            ":hover,:active": {
              borderColor: "primary",
              background: "transparent",
            },
          }}
          onClick={() => nextTurn(answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
  const [freeInput, setFreeInput] = React.useState("");
  const onFreeInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFreeInput(e.target.value);
  const sendFreeInput = () => {
    nextTurn(freeInput.toLowerCase());
    setFreeInput("");
  };
  const renderFreeInput = () => (
    <div sx={{ display: "flex", justifyContent: "center" }}>
      <input
        value={freeInput}
        onChange={onFreeInputChange}
        onKeyPress={(e) => {
          if (e.charCode === 13) sendFreeInput();
        }}
      ></input>
      <button sx={{ ml: 2 }} onClick={sendFreeInput}>
        Answer
      </button>
    </div>
  );
  return (
    <div
      sx={{
        flexGrow: 1,
        display: "grid",
        gridTemplateColumns: "100%",
        gridTemplateRows: "auto min-content",
        justifyContent: "center",
        alignItems: "center",
        p: "10px",
      }}
    >
      <div
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <div
          sx={{
            minWidth: "260px",
            fontSize: "70px",
            textAlign: "center",
            padding: "30px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            mb: "25px",
          }}
        >
          {question.question}
        </div>
      </div>
      <div sx={{ my: "20px" }}>
        {gameMode.multipleChoice ? renderAnswers() : renderFreeInput()}
      </div>
    </div>
  );
};
export default Question;
