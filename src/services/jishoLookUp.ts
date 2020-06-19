import axios from "axios";

export interface JishoData {
  data: {
    japanese: {
      word: string;
      reading: string;
    }[];
    senses: {
      english_definitions: string[];
      parts_of_speech: string[];
    }[];
  }[];
}

const jishoLookUp = async (searchWord: string) => {
  console.log(searchWord);
  const response = await axios.get(
    `https://jisho.org/api/v1/search/words?keyword=${searchWord}`
  );
  console.log(await response.data);
  let words = (response.data as JishoData).data;
  words = words.map((word) => ({
    ...word,
    japanese: word.japanese.filter((reading) => reading.word === searchWord),
  }));
  words = words.filter((word) => word.japanese.length > 1);
  const meanings: { [key: string]: true } = {};
  const readings: { [key: string]: true } = {};
  words.forEach((word) =>
    word.senses.forEach((sense) =>
      sense.english_definitions.forEach(
        (definition) => (meanings[definition] = true)
      )
    )
  );
  words.forEach((word) =>
    word.japanese.forEach((reading) => (readings[reading.reading] = true))
  );
  const meaning = Object.keys(meanings).join(", ");
  const hiragana = Object.keys(readings).join(", ");

  return { meaning, hiragana };
};

export default jishoLookUp;
