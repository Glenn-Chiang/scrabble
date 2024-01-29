import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Array of tiles in player's rack. May contain duplicate letters.
const initialState: string[] = []

export const playerTilesSlice = createSlice({
  name: "player-tiles",
  initialState,
  reducers: {
    addTile: (tiles, action: PayloadAction<string>) => {
        tiles.push(action.payload)
    }
  }
})

export const selectPlayerTiles = (state: RootState) => state.playerTiles