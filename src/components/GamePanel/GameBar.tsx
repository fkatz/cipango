/** @jsx jsx */
import { jsx } from "theme-ui";
import Toolbar from "../Toolbar";
import { ReactComponent as CrossIcon } from "../../images/cross.svg";
import GameState from "../../models/game-state";

const GameBar = ({
  gameState,
  endGame,
}: {
  gameState: GameState;
  endGame: () => void;
}) => {
  return (
    <Toolbar>
      {gameState.start && (
        <div
          sx={{
            height: "25px",
            mr: 2,
            transition: "0.2s",
            opacity: 0.6,
            ":hover": { opacity: 1 },
          }}
          onClick={endGame}
        >
          <CrossIcon sx={{ height: "25px", width: "25px" }} />
        </div>
      )}
    </Toolbar>
  );
};

export default GameBar;
