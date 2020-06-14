/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { GamesContext } from "../../contexts/GamesContext";
import Filters from "../Filters";
import { useSelector } from "react-redux";
import { RootState } from "../../store/actions";
import GameMode from "../../models/game-mode";
import { getFilteredWords } from "../../helpers";

const GameSelector = () => {
  const {
    filters,
    setFilters,
    gameMode,
    setGameMode,
    setGameState,
  } = React.useContext(GamesContext);
  const renderButton = (key: keyof GameMode, value: any, text: string) => (
    <button
      sx={{
        mb: "5px",
        backgroundColor: gameMode[key] === value ? "active" : "muted",
      }}
      onClick={() => setGameMode((gameMode) => ({ ...gameMode, [key]: value }))}
    >
      {text}
    </button>
  );
  const words = useSelector((state: RootState) => state.words);
  const filteredWords = React.useMemo(() => getFilteredWords(words, filters), [
    words,
    filters,
  ]);
  const setTurns = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target && e.target.value === "" ? 0 : parseInt(e.target.value);
    setGameMode((gameMode) => ({
      ...gameMode,
      turns: value,
    }));
  };
  const isValid =
    gameMode.turns > 0 &&
    (gameMode.multipleChoice ? filteredWords.length >= 4 : true);
  const startGame = () => {
    if (isValid) setGameState((gameState) => ({ ...gameState, start: true }));
  };
  React.useEffect(() => {
    if (gameMode.questionType === "meaning")
      setGameMode((gameMode) => ({ ...gameMode, romajiAnswers: true }));
  }, [setGameMode, gameMode.questionType]);
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "10px",
        p: "10px",
      }}
    >
      <div sx={{ maxWidth: "500px", button: { mr: 2 } }}>
        <h2 sx={{}}>1. Select which words to use</h2>
        <Filters sx={{}} filters={filters} setFilters={setFilters} />
        <div
          sx={{ mt: "20px", mb: "10px", color: "muted", fontStyle: "italic" }}
        >
          Currently selected {filteredWords.length} words. Multiple Choice mode
          needs at least 4.
        </div>
        <h2>2. Select your quiz settings</h2>
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: ["1fr", "max-content auto"],
            gridTemplateRows: ["1fr", "1fr 1fr"],
            alignItems: "center",
            columnGap: "20px",
            rowGap: "10px",
          }}
        >
          <span>Question type</span>
          <div>
            {renderButton("questionType", "meaning", "Meaning")}
            {renderButton("questionType", "reading", "Reading")}
          </div>
          {gameMode.questionType === "reading" && (
            <React.Fragment>
              <span>Answer type</span>
              <div>
                {renderButton("romajiAnswers", true, "Romaji")}
                {renderButton("romajiAnswers", false, "Hiragana")}
              </div>
            </React.Fragment>
          )}
          <span>Answer input type</span>
          <div>
            {renderButton("multipleChoice", true, "Multiple Choice")}
            {renderButton("multipleChoice", false, "Free Input")}
          </div>
          <span>Number of questions</span>
          <input
            onChange={setTurns}
            sx={{ width: "60px" }}
            type="number"
            value={gameMode.turns || ""}
            min="0"
          />
        </div>
        <div
          sx={{
            mt: "10px",
            pt: "25px",
            borderTop: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button disabled={!isValid} onClick={startGame}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
export default GameSelector;
