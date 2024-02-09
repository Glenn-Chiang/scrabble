import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type WordScore = {
  word: string,
  score: number
}

const initialState: WordScore[] = []

export const wordScoresSlice = createSlice(
  {
    name: 'word-scores',
    initialState,
    reducers: {
      set: (wordScores, action: PayloadAction<WordScore[]>) => {
        wordScores.splice(0, wordScores.length, ...action.payload)
      }
    }
  }
)