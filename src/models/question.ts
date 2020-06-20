import Word from "./word";

export default interface Question {
  question: Word;
  answers?: Word[];
}
