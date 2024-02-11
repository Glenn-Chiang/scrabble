import { playerTilesSlice } from "../../redux-config/slices/playerTiles";
import { tileBagSlice } from "../../redux-config/slices/tileBag";
import { tileExchangeSlice } from "../../redux-config/slices/tileExchange";
import { useAppDispatch } from "../../redux-config/store";
import { useDrawTiles } from "./drawTiles";
import { useCurrentPlayer } from "./useCurrentPlayer";

// During their turn, the player can choose to exchange one or more tiles for an equal number from the bag and score 0
export function useExchangeTiles() {
  const dispatch = useAppDispatch()
  const drawTiles = useDrawTiles()
  const playerId = useCurrentPlayer()

  return (lettersToExchange: string[]) => {
    // remove specified tiles from player's rack
    dispatch(playerTilesSlice.actions.removeTiles({playerId, letters: lettersToExchange}))
    // add tiles back to tileBag
    dispatch(tileBagSlice.actions.addTiles(lettersToExchange))
    
    // draw the same number of tiles that were returned
    drawTiles(playerId, lettersToExchange.length)

    // clear selection
    dispatch(tileExchangeSlice.actions.clear())
  }
}