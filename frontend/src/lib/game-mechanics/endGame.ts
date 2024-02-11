import { gameStateSlice } from "../../redux-config/slices/gameState";
import { playGridSlice } from "../../redux-config/slices/playGrid";
import { selectedTileSlice } from "../../redux-config/slices/selectedTile";
import { tileExchangeSlice } from "../../redux-config/slices/tileExchange";
import { wordScoresSlice } from "../../redux-config/slices/wordScores";
import { useAppDispatch } from "../../redux-config/store";

export function useEndGame() {
  const dispatch = useAppDispatch();

  return () => {
    console.log("Game ended");
    dispatch(gameStateSlice.actions.setGameProgress("post-game"));

    dispatch(playGridSlice.actions.reset());
    dispatch(wordScoresSlice.actions.reset());
    dispatch(selectedTileSlice.actions.reset())
    dispatch(tileExchangeSlice.actions.reset())
  };
}
