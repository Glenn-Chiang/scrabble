import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { tileBagReducer } from "./slices/tileBag";
import { playerTilesReducer } from "./slices/playerTiles";

export const store = configureStore({
  reducer: {
    tileBag: tileBagReducer,
    playerTiles: playerTilesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

