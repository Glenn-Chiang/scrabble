import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";

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

export const usePlayerTiles = () => {
  return useAppSelector(state => state.playerTiles)
}