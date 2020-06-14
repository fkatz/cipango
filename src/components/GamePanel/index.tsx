/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { GamesContext } from "../../contexts/GamesContext";
import GameSelector from "./GameSelector";
import Game from "./Game";
import GameBar from "./GameBar";
const GamePanel = () => {
  const { gameState, endGame } = React.useContext(GamesContext);
  return (
    <div sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <GameBar gameState={gameState} endGame={endGame} />
      {!gameState.start ? <GameSelector /> : <Game />}
    </div>
  );
};
export default GamePanel;
