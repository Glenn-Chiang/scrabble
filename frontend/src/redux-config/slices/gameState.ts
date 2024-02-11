import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TurnState = 'pending' | 'exchanging' | 'invalid-placement' | 'invalid-words' | 'valid'

type GameState = {
  turnNumber: number,
  turnState: TurnState,
  consecutiveSkips: number
}

const initialState: GameState = {
  turnNumber: 0,
  turnState: 'pending',
  consecutiveSkips: 0
}

export const gameStateSlice = createSlice({
  name: 'game-state',
  initialState,
  reducers: {
    nextTurn: (state) => {
      state.turnNumber++
    },
    setTurnState: (state, action: PayloadAction<TurnState>) => {
      state.turnState = action.payload
    },
    addSkip: (state) => {
      state.consecutiveSkips++
    },
    resetSkips: (state) => {
      state.consecutiveSkips = 0
    }

  }
})