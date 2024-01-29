import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTileIndex: -1, // which playable tile is currently selected by player
};

export const playSlice = createSlice({
  name: "play-slice",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<number>) => {
      state.selectedTileIndex =
        state.selectedTileIndex != action.payload ? action.payload : -1; // if user selects an already selected tile, unselect it
    },
  },
});