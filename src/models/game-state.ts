import Question from "./question";

export default interface GameState {
  start: boolean;
  turn: number;
  correctAnswers: number;
  currentQuestion?: Question;
  lastQuestion?: { question: Question; wasCorrect: boolean };
}
