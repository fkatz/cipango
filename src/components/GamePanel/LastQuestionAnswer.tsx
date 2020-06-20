/** @jsx jsx */
import { jsx } from "theme-ui";
import Question from "../../models/question";
import GameMode from "../../models/game-mode";

const LastQuestionAnswer = ({
  lastQuestion,
  gameMode,
}: {
  lastQuestion?: { question: Question; wasCorrect: boolean };
  gameMode: GameMode;
}) => {
  return (
    <div
      sx={{
        color: lastQuestion?.wasCorrect ? "success" : "error",
        textAlign: "center",
        px: "10px",
        py: "20px",
        minHeight: "71px",
        fontSize: "20px",
        ...(lastQuestion && { borderBottom: "1px solid #ccc" }),
      }}
    >
      {lastQuestion
        ? `${lastQuestion.wasCorrect ? "Correct!" : "Wrong!"} ${
            lastQuestion.question.question.word
          } = ${
            gameMode.questionType === "meaning"
              ? lastQuestion.question.question.meaning.join("; ")
              : gameMode.romajiAnswers
              ? lastQuestion.question.question.romaji
              : lastQuestion.question.question.hiragana
          }`
        : " "}
    </div>
  );
};
export default LastQuestionAnswer;
