/** @jsx jsx */
import { jsx } from "theme-ui";
import GameState from "../../models/game-state";
import GameMode from "../../models/game-mode";

const EndGameScreen = ({
  gameState,
  gameMode,
  endGame,
}: {
  gameState: GameState;
  gameMode: GameMode;
  endGame: () => void;
}) => {
  const ratio = (gameState.correctAnswers / gameMode.turns) * 10;
  return (
    <div
      sx={{
        flexGrow: 1,
        p: "10px",
        fontSize: "24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        {gameState.correctAnswers} of {gameMode.turns} correct answers
        {ratio > 6 ? "!" : ""}
      </div>
      <div>
        {ratio < 6 && "Keep working on it!"}
        {ratio > 6 && ratio < 10 && "Good job, you're doing great!"}
        {ratio === 10 && "Perfect score!"}
      </div>
      <button onClick={endGame} sx={{ mt: "30px" }}>
        End Quiz
      </button>
    </div>
  );
};

export default EndGameScreen;
