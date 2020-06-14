import React from "react";
import Filter from "../models/filter";
import GameMode from "../models/game-mode";
import GameState from "../models/game-state";

const GamesContext = React.createContext(
  {} as {
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
    gameMode: GameMode;
    setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    endGame: () => void;
  }
);

const GamesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = React.useState({} as Filter);

  const [gameMode, setGameMode] = React.useState({
    questionType: "meaning",
    romajiAnswers: true,
    multipleChoice: true,
    turns: 20,
  } as GameMode);

  const [gameState, setGameState] = React.useState({
    start: false,
    turn: 0,
    correctAnswers: 0,
  } as GameState);
  const endGame = () => {
    setGameState({ start: false, turn: 0, correctAnswers: 0 });
  };
  return (
    <GamesContext.Provider
      value={{
        filters,
        setFilters,
        gameMode,
        setGameMode,
        gameState,
        setGameState,
        endGame,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export { GamesContext, GamesContextProvider };
