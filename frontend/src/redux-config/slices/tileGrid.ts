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
    placeTiles: (grid, action: PayloadAction<string[][]>) => {
      const playGrid = action.payload
      for (let i = 0; i < playGrid.length; i++) {
        for (let j = 0; j < playGrid.length; j++) {
          if (playGrid[i][j]) {
            grid[i][j] = playGrid[i][j]
          }
        }
      }
    }
  },
});

export const selectTileGrid = (state: RootState) => state.tileGrid;
