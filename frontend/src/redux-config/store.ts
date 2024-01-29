import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { playerTilesSlice } from "./slices/playerTiles";
import { tileBagSlice } from "./slices/tileBag";
import { tileGridSlice } from "./slices/tileGrid";

export const store = configureStore({
  reducer: {
    tileBag: tileBagSlice.reducer,
    playerTiles: playerTilesSlice.reducer,
    tileGrid: tileGridSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

