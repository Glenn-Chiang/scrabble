// Not to be confused with boardMatrix or playGrid
// tileGrid refers to the positions of the letter tiles that have already been played on the board
// Tiles in tileGrid cannot be moved

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boardRows } from "../../lib/game-constants/board";
import { RootState } from "../store";

const initialState: string[][] = Array.from({ length: boardRows }, () =>
  Array(boardRows).fill("")
);

export const tileGridSlice = createSlice({
  name: "tile-grid",
  initialState,
  reducers: {
    placeTile: (
      grid,
      action: PayloadAction<{ row: number; col: number; letter: string }>
    ) => {
      const { row, col, letter } = action.payload;
      grid[row][col] = letter;
    },
  },
});

export const selectTileGrid = (state: RootState) => state.tileGrid;
