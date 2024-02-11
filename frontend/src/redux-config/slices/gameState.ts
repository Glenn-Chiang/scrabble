import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TurnState = 'pending' | 'exchanging' | 'invalid-placement' | 'invalid-words' | 'valid'

type GameState = {
  turnNumber: number,
  turnState: TurnState
}

const initialState: GameState = {
  turnNumber: 0,
  turnState: 'pending'
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
    }
  }
})