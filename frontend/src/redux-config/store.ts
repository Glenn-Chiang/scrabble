import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { playerTilesSlice } from "./slices/playerTiles";
import { tileBagSlice } from "./slices/tileBag";
import { tileGridSlice } from "./slices/tileGrid";
import { selectedTileSlice } from "./slices/selectedTile";
import { playGridSlice } from "./slices/playGrid";
import { wordScoresSlice } from "./slices/wordScores";
import { playerScoresSlice } from "./slices/playerScores";
import { gameStateSlice } from "./slices/gameState";
import { tileExchangeSlice } from "./slices/tileExchange";

export const store = configureStore({
  reducer: {
    tileBag: tileBagSlice.reducer,
    playerTiles: playerTilesSlice.reducer,
    tileGrid: tileGridSlice.reducer,
    selectedTile: selectedTileSlice.reducer,
    playGrid: playGridSlice.reducer,
    wordScores: wordScoresSlice.reducer,
    playerScores: playerScoresSlice.reducer,
    gameState: gameStateSlice.reducer,
    tileExchange: tileExchangeSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

