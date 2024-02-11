import { gameStateSlice } from "../../redux-config/slices/gameState";
import { useAppDispatch } from "../../redux-config/store";

export function useEndGame() {
  const dispatch = useAppDispatch();

  return () => {
    console.log("Game ended");
    //TODO: Implement endGame logic
    dispatch(gameStateSlice.actions.setGameProgress("post-game"));
  };
}
