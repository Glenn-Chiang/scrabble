import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { tileBagReducer } from "./slices/tileBag";
import { playerRackReducer } from "./slices/playerRack";

export const store = configureStore({
  reducer: {
    tileBag: tileBagReducer,
    playerRack: playerRackReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

