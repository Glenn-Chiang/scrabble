import wordList from "../game-constants/wordList.json";

export function validateWord(word: string): boolean {
  return (wordList as {[word: string]: number})[word.toLowerCase()] === 1
}
