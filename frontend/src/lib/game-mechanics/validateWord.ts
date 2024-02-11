import wordList from "../game-constants/wordList.json";

export function validateWord(word: string): boolean {
  // TODO: Handle blank tiles

  return (wordList as {[word: string]: number})[word.toLowerCase()] === 1
}
