import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Indices of player tiles which are selected to be exchanged
const initialState: number[] = []

export const tileExchangeSlice = createSlice(
  {
    name: 'tile-exchange',
    initialState,
    reducers: {
      selectTile: (state, action: PayloadAction<number>) => {
        const tileIndex = action.payload
        // If player selects a tile that is already selected, it will be unselected
        if (state.includes(tileIndex)) {
          state.splice(state.indexOf(tileIndex), 1)
        } else {
          state.push(tileIndex)
        }
      },
      reset: () => initialState
    }
  }
)