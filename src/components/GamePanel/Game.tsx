/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { GamesContext } from "../../contexts/GamesContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store/actions";
import { getFilteredWords } from "../../helpers";
import Word from "../../models/word";
import Question from "./Question";
import QuestionModel from "../../models/question";
import EndGameScreen from "./EndGameScreen";
import LastQuestionAnswer from "./LastQuestionAnswer";
import ProgressBar from "../ProgressBar";

const Game = () => {
  const words = useSelector((state: RootState) => state.words);
  const {
    filters,
    gameState,
    setGameState,
    gameMode,
    endGame,
  } = React.useContext(GamesContext);

  const filteredWords = React.useMemo(() => getFilteredWords(words, filters), [
    words,
    filters,
  ]);

  const getNextQuestion = (lastQuestion?: QuestionModel): QuestionModel => {
    const getRandomAnswers = (answers: Word[]): Word[] => {
      const restWords = filteredWords.filter(
        (word) => !answers.some((answer) => answer.word === word.word)
      );
      const randomIndex = Math.floor(Math.random() * restWords.length);
      const newAnswers = [...answers, restWords[randomIndex]];
      if (answers.length < 3) {
        return getRandomAnswers(newAnswers);
      } else
        return newAnswers
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
    };
    const turnWords = lastQuestion
      ? filteredWords.filter((word) => word.word !== lastQuestion.question)
      : filteredWords;
    const randomIndex = Math.floor(Math.random() * turnWords.length);
    const word = turnWords[randomIndex];
    const key: keyof Word =
      gameMode.questionType === "meaning"
        ? "meaning"
        : gameMode.romajiAnswers
        ? "romaji"
        : "hiragana";
    let answers: string[] = [];
    if (gameMode.multipleChoice) {
      let answerMap: { [key: string]: true } = {};
      getRandomAnswers([word])
        .map((answer) => answer[key]!)
        .forEach((answer) => (answerMap[answer] = true));
      answers = Object.keys(answerMap);
    }
    return {
      question: word.word,
      correctAnswer: word[key]!,
      ...(gameMode.multipleChoice && { answers }),
    };
  };

  const [question, setQuestion] = React.useState(getNextQuestion());
  const [lastQuestion, setLastQuestion] = React.useState(
    null as null | { question: QuestionModel; wasCorrect: boolean }
  );

  const nextTurn = (answer: string) => {
    const getIsCorrect = () => {
      if (!gameMode.multipleChoice && question.correctAnswer.includes(",")) {
        const correctAnswers = question.correctAnswer.split(/[ ]*,[ ]*/);
        const answers = answer.split(/[ ]*,[ ]*/);
        return correctAnswers.some((correctAnswer) =>
          answers.includes(correctAnswer)
        );
      }
      return answer === question.correctAnswer;
    };
    const isCorrect = getIsCorrect();
    const nextTurn = gameState.turn + 1;
    setLastQuestion({ question, wasCorrect: isCorrect });
    if (nextTurn < gameMode.turns) {
      setQuestion(getNextQuestion(question));
    }
    setGameState((gameState) => ({
      ...gameState,
      turn: nextTurn,
      correctAnswers: gameState.correctAnswers + (isCorrect ? 1 : 0),
    }));
  };
  return (
    <React.Fragment>
      <LastQuestionAnswer lastQuestion={lastQuestion} />
      {gameState.turn < gameMode.turns ? (
        <Question gameMode={gameMode} question={question} nextTurn={nextTurn} />
      ) : (
        <EndGameScreen
          gameState={gameState}
          endGame={endGame}
          gameMode={gameMode}
        />
      )}
      <ProgressBar
        good={gameState.correctAnswers}
        bad={gameState.turn - gameState.correctAnswers}
        total={gameMode.turns}
        sx={{ mx: "10px", mb: "20px" }}
      />
    </React.Fragment>
  );
};
export default Game;
