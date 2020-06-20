/** @jsx jsx */
import { jsx } from "theme-ui";
import GameMode from "../../models/game-mode";
import React from "react";
import GameState from "../../models/game-state";
import Word from "../../models/word";
import QuestionModel from "../../models/question";

const Question = ({
  words,
  gameState,
  setGameState,
  gameMode,
}: {
  words: Word[];
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameMode: GameMode;
}) => {
  const getNextQuestion = React.useCallback(
    (lastWord?: Word): QuestionModel => {
      const notRepeatedWords = lastWord
        ? words.filter(
            (word) =>
              word.word !== lastWord.word && word.hiragana !== lastWord.hiragana
          )
        : words;
      const randomIndex = Math.floor(Math.random() * notRepeatedWords.length);
      const question = notRepeatedWords[randomIndex];
      const getPossibleAnswers = (answers: Word[]) =>
        words.filter((word) => {
          let possible = answers.every((answer) => word.word !== answer.word);
          if (gameMode.questionType === "meaning") {
            possible =
              possible &&
              answers.every(
                (answer) =>
                  !answer.meaning.every((meaning) =>
                    word.meaning.includes(meaning)
                  )
              );
          } else {
            possible =
              possible &&
              answers.every((answer) => word.hiragana !== answer.hiragana);
          }
          return possible;
        });
      let answers = [question];
      for (let i = 0; i < 3; i++) {
        const possibleAnswers = getPossibleAnswers(answers);
        if (possibleAnswers.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * possibleAnswers.length
          );
          answers = [...answers, possibleAnswers[randomIndex]];
        }
      }
      answers = answers
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      return { question, answers };
    },
    [gameMode.questionType, words]
  );

  React.useEffect(() => {
    if (!gameState.currentQuestion)
      setGameState((gameState) => ({
        ...gameState,
        currentQuestion: getNextQuestion(),
      }));
  }, [gameState, setGameState, getNextQuestion]);

  const nextTurn = (correct: boolean) => {
    setGameState((gameState) => ({
      ...gameState,
      correctAnswers: correct
        ? gameState.correctAnswers + 1
        : gameState.correctAnswers,
      turn: gameState.turn + 1,
      lastQuestion: {
        wasCorrect: correct,
        question: gameState.currentQuestion!,
      },
      currentQuestion: getNextQuestion(gameState.currentQuestion!.question),
    }));
  };

  const renderAnswers = () => {
    const isCorrect = (answer: Word): boolean => {
      if (
        gameState.currentQuestion?.question.word === answer.word &&
        gameState.currentQuestion.question.hiragana === answer.hiragana
      ) {
        return true;
      } else return false;
    };
    const Answer = ({ answer }: { answer: Word }) => {
      return (
        <button
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
          onClick={() => nextTurn(isCorrect(answer))}
        >
          {gameMode.questionType === "meaning"
            ? answer.meaning.join("; ")
            : gameMode.romajiAnswers
            ? answer.romaji
            : answer.hiragana}
        </button>
      );
    };
    return (
      gameState.currentQuestion && (
        <div
          sx={{
            display: "grid",
            gridTemplateColumns:
              gameState.currentQuestion.answers?.length === 3
                ? "1fr 1fr 1fr"
                : ["1fr 1fr", "1fr 1fr 1fr 1fr"],
            columnGap: "10px",
            rowGap: "10px",
          }}
        >
          {gameState.currentQuestion.answers?.map((answer) => (
            <Answer answer={answer} key={answer.word + ";" + answer.hiragana} />
          ))}
        </div>
      )
    );
  };

  const [freeInput, setFreeInput] = React.useState("");
  const renderFreeInput = () => {
    const isCorrect = (answer: string): boolean => {
      const correctAnswers = words.filter(
        (word) => word.word === gameState.currentQuestion!.question.word
      );
      const answers = answer.split(/[ ]*;[ ]*/);
      if (gameMode.questionType === "reading") {
        const key: keyof Word = gameMode.romajiAnswers ? "romaji" : "hiragana";
        return correctAnswers.some((correctAnswer) =>
          answers.some((answer) => correctAnswer[key] === answer)
        );
      } else
        return correctAnswers.some((correctAnswer) =>
          correctAnswer.meaning.some((meaning) => answers.includes(meaning))
        );
    };
    const onFreeInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setFreeInput(e.target.value);
    const sendFreeInput = () => {
      nextTurn(isCorrect(freeInput.toLowerCase()));
      setFreeInput("");
    };
    return (
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
  };

  return (
    <React.Fragment>
      {gameState.currentQuestion && (
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
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
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
              {gameState.currentQuestion.question.word}
            </div>
          </div>
          <div sx={{ my: "20px" }}>
            {gameMode.multipleChoice ? renderAnswers() : renderFreeInput()}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Question;
