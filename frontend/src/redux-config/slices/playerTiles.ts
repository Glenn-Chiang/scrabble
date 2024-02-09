import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Array of tiles in player's rack. May contain duplicate letters.
const initialState: [string[], string[]] = [[], []];

export const playerTilesSlice = createSlice({
  name: "player-tiles",
  initialState,
  reducers: {
    addTile: (
      tiles,
      action: PayloadAction<{ playerId: number; letter: string }>
    ) => {
      const { playerId, letter } = action.payload;
      tiles[playerId].push(letter);
    },
    removeTile: (
      tiles,
      action: PayloadAction<{ playerId: number; letter: string }>
    ) => {
      const { playerId, letter } = action.payload;

      const indexToRemove = tiles[playerId].indexOf(letter);
      if (indexToRemove != -1) {
        tiles[playerId].splice(indexToRemove, 1);
      }
    },
  },
});

export const selectPlayerTiles = (state: RootState) => state.playerTiles;
