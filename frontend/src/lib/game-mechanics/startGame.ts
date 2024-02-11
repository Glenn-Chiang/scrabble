import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playGridSlice } from "../../redux-config/slices/playGrid";
import { playerScoresSlice } from "../../redux-config/slices/playerScores";
import { playerTilesSlice } from "../../redux-config/slices/playerTiles";
import { tileBagSlice } from "../../redux-config/slices/tileBag";
import { tileGridSlice } from "../../redux-config/slices/tileGrid";
import { useAppDispatch } from "../../redux-config/store";
import { rackLimit } from "../game-constants/tiles";
import { useDrawTiles } from "./drawTiles";

export function useStartGame() {
  const dispatch = useAppDispatch();
  const drawTiles = useDrawTiles();
  return () => {
    // Reset all game state
    dispatch(tileGridSlice.actions.reset())
    dispatch(playGridSlice.actions.reset())
    dispatch(tileBagSlice.actions.reset())
    dispatch(playerTilesSlice.actions.reset())
    dispatch(playerScoresSlice.actions.reset())
    
    dispatch(gameStateSlice.actions.setGameProgress("in-game"));
    // Draw first 7 tiles for both players
    drawTiles(0, rackLimit);
    drawTiles(1, rackLimit);
  };
}
