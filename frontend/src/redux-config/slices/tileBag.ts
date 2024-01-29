import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tileCounts } from "../../lib/game-constants/tiles";
import { RootState } from "../store";

const slice = createSlice({
  name: "tileBag",
  initialState: tileCounts, // Initialize with full bag of tiles
  reducers: {
    drawTile: (state, action: PayloadAction<string>) => {
      state[action.payload] -= 1;
    },
  },
});

export const { drawTile } = slice.actions;

export const selectTileCounts = (state: RootState) => state.tileBag;

export const tileBagReducer = slice.reducer;
