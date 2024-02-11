import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Array of tiles in player's rack. May contain duplicate letters.
const initialState: [string[], string[]] = [[], []];

export const playerTilesSlice = createSlice({
  name: "player-tiles",
  initialState,
  reducers: {
    addTile: (
      playerTiles,
      action: PayloadAction<{ playerId: number; letter: string }>
    ) => {
      const { playerId, letter } = action.payload;
      playerTiles[playerId].push(letter);
    },
    removeTile: (
      playerTiles,
      action: PayloadAction<{ playerId: number; letter: string }>
    ) => {
      const { playerId, letter } = action.payload;

      const indexToRemove = playerTiles[playerId].indexOf(letter);
      if (indexToRemove != -1) {
        playerTiles[playerId].splice(indexToRemove, 1);
      }
    },
    removeTiles: (playerTiles, action: PayloadAction<{playerId: number, letters: string[]}>) => {
      const {playerId, letters} = action.payload

      for (const letter of letters) {
        const indexToRemove = playerTiles[playerId].indexOf(letter)
        if (indexToRemove != -1) {
          playerTiles[playerId].splice(indexToRemove, 1)
        }
      }
    }
  },
});

export const selectPlayerTiles = (state: RootState) => state.playerTiles;
