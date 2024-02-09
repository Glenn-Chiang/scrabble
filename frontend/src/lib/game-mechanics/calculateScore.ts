import { WordScore } from "../../redux-config/slices/wordScores";

export function calculateScore(wordScores: WordScore[]): number {
  return wordScores.reduce((prev, curr) => prev + curr.score, 0)
}