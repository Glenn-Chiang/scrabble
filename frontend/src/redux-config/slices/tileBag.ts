import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tileCounts } from "../../lib/game-constants/tiles";
import { RootState } from "../store";

export const tileBagSlice = createSlice({
  name: "tile-bag",
  initialState: tileCounts, // Initialize with full bag of tiles
  reducers: {
    removeTile: (state, action: PayloadAction<[string, number]>) => {
      const [letter, numberToRemove] = action.payload;
      state[letter] -= numberToRemove;
    },
    addTiles: (state, action: PayloadAction<string[]>) => {
      const letters = action.payload
      for (const letter of letters) {
        if (state[letter] < tileCounts[letter]) {
          state[letter]++
        }
      }
    }
  },
});

export const { removeTile } = tileBagSlice.actions;

export const selectTileBag = (state: RootState) => state.tileBag;

