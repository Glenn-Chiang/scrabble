import { tileGridSlice } from "../../redux-config/slices/tileGrid"
import { useAppDispatch, useAppSelector } from "../../redux-config/store"

export const useEndTurn = () => {
  // const tileGrid = useAppSelector(state => state.tileGrid)
  const playGrid = useAppSelector(state => state.playGrid)

  const dispatch = useAppDispatch()
  // check that tiles in playGrid are either all in the same row or all in the same column

  return () => {
    dispatch(tileGridSlice.actions.placeTiles(playGrid))
  }
}