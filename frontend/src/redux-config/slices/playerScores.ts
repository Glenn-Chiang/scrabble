import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: [number, number] = [0,0]

export const playerScoresSlice = createSlice(
  {
    name: 'player-scores',
    initialState,
    reducers: {
      add: (scores, action: PayloadAction<{playerId: number, score: number}>) => {
        const {playerId, score} = action.payload
        scores[playerId] += score
      },
      reset: () => initialState
    }
  }
)

