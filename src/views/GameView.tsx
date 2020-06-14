/** @jsx jsx */
import { jsx } from "theme-ui";
import { GamesContextProvider } from "../contexts/GamesContext";
import GamePanel from "../components/GamePanel";

const GameView = () => {
  return (
    <GamesContextProvider>
      <GamePanel />
    </GamesContextProvider>
  );
};

export default GameView;
