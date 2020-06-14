/** @jsx jsx */
import { jsx } from "theme-ui";
import Question from "../../models/question";

const LastQuestionAnswer = ({
  lastQuestion,
}: {
  lastQuestion: { question: Question; wasCorrect: boolean } | null;
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
            lastQuestion.question.question
          } = ${lastQuestion.question.correctAnswer}`
        : " "}
    </div>
  );
};
export default LastQuestionAnswer;
