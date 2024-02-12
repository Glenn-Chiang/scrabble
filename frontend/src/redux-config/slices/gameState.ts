import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TurnState = 'pending' | 'exchanging' | 'exchanged' | 'invalid' | 'valid'

type GameProgress = 'pre-game' | 'in-game' | 'post-game'

type GameState = {
  turnNumber: number,
  turnState: TurnState,
  consecutiveSkips: number
  gameProgress: GameProgress
}

const initialState: GameState = {
  turnNumber: 0,
  turnState: 'pending',
  consecutiveSkips: 0,
  gameProgress: 'pre-game'
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
    },
    setGameProgress: (state, action: PayloadAction<GameProgress>) => {
      state.gameProgress = action.payload
    }

  }
})