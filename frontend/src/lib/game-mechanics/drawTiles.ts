import { useAppDispatch } from "../../redux-config/store";
import { removeTile } from "../../redux-config/slices/tileBag";
import { playerRackSlice } from "../../redux-config/slices/playerRack";

export const useDrawTiles = () => {
  const dispatch = useAppDispatch();
  return (player: number, numberToDraw: number) => {
    // Insert logic to randomly select given number of tiles from bag, taking into consideration the number of each tile remaining
    const selectedTiles: [string, number][] = [['A',7]]

    for (const letter of selectedTiles) {
      const [tile, numberToRemove] = letter
      // Remove tiles from tileBag
      dispatch(removeTile([tile, numberToRemove]));
      // Add tile to player's rack
      dispatch(playerRackSlice.actions.addTile([tile, numberToRemove]))
    }
  };
};
