import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  turnNumber: 0
}

export const gameStateSlice = createSlice({
  name: 'game-state',
  initialState,
  reducers: {
    nextTurn: (state) => {
      state.turnNumber++
    }
  }
})