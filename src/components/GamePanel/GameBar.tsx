/** @jsx jsx */
import { jsx } from "theme-ui";
import Toolbar from "../Toolbar";
import { ReactComponent as CrossIcon } from "../../images/cross.svg";
import GameState from "../../models/game-state";
import Icon from "../Icon";

const GameBar = ({
  gameState,
  endGame,
}: {
  gameState: GameState;
  endGame: () => void;
}) => {
  return (
    <Toolbar>
      {gameState.start && <Icon iconComponent={CrossIcon} onClick={endGame} />}
    </Toolbar>
  );
};

export default GameBar;
