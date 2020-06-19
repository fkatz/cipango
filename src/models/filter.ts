import { WordType } from "./word";

export default interface Filter {
  types?: WordType[];
  tags?: string[];
}
