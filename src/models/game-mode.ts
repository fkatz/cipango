export default interface GameMode {
  questionType: "meaning" | "reading";
  romajiAnswers: boolean;
  multipleChoice: boolean;
  turns: number;
}
