// Not to be confused with boardMatrix or tileGrid
// playGrid refers to the positions of the tiles placed during the current turn
// Tiles in playGrid CAN be removed and returned to the player rack

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boardRows } from "../../lib/game-constants/board";

const initialState: string[][] = Array.from({ length: boardRows }, () =>
  Array(boardRows).fill("")
);

export const playGridSlice = createSlice({
  name: "play-grid",
  initialState,
  reducers: {
    placeTile: (
      grid,
      action: PayloadAction<{ row: number; col: number; letter: string }>
    ) => {
      const { row, col, letter } = action.payload;
      grid[row][col] = letter;
    },
    removeTile: (grid, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      grid[row][col] = "";
    },
    clear: (grid) => {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          grid[i][j] = ''
        }
      }
    }
  },
});
