import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {[letter: string]: number} = {}

export const playerRackSlice = createSlice({
  name: "player-rack",
  initialState,
  reducers: {
    addTile: (tileCounts, action: PayloadAction<[string, number]>) => {
      const [tile, numberToAdd] = action.payload
      tileCounts[tile] = (tileCounts[tile] || 0) + numberToAdd;
    }
  }
})

export const selectPlayerRack = (state: RootState) => state.playerRack

export const playerRackReducer = playerRackSlice.reducer