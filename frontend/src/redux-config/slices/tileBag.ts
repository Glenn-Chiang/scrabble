import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tileCounts } from "../../lib/game-constants/tiles";
import { RootState } from "../store";

const slice = createSlice({
  name: "tile-bag",
  initialState: tileCounts, // Initialize with full bag of tiles
  reducers: {
    removeTile: (tileCounts, action: PayloadAction<[string, number]>) => {
      const [tileLetter, numberToRemove] = action.payload
      tileCounts[tileLetter] -= numberToRemove;
    },
  },
});

export const { removeTile} = slice.actions;

export const selectTileBag = (state: RootState) => state.tileBag;

export const tileBagReducer = slice.reducer;
