/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { GamesContext } from "../../contexts/GamesContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store/actions";
import { getFilteredWords } from "../../helpers";
import Question from "./Question";
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
  return (
    <React.Fragment>
      <LastQuestionAnswer
        lastQuestion={gameState.lastQuestion}
        gameMode={gameMode}
      />
      {gameState.turn < gameMode.turns ? (
        <Question
          words={filteredWords}
          gameMode={gameMode}
          gameState={gameState}
          setGameState={setGameState}
        />
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
