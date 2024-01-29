import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { playerTilesSlice } from "./slices/playerTiles";
import { tileBagSlice } from "./slices/tileBag";
import { tileGridSlice } from "./slices/tileGrid";
import { playSlice } from "./slices/play";
import { playGridSlice } from "./slices/playGrid";

export const store = configureStore({
  reducer: {
    tileBag: tileBagSlice.reducer,
    playerTiles: playerTilesSlice.reducer,
    tileGrid: tileGridSlice.reducer,
    play: playSlice.reducer,
    playGrid: playGridSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

