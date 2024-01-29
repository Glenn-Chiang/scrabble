import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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