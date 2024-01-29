import { removeTile } from "../../redux-config/slices/tileBag";
import { useAppDispatch } from "../../redux-config/store";

export const useDrawTiles = () => {
  const dispatch = useAppDispatch();
  return (player: number, numberToDraw: number) => {
    // Insert logic to randomly select given number of tiles from bag, taking into consideration the number of each tile remaining
    const selectedTiles: [string, number][] = [['A',7]]

    for (const tile of selectedTiles) {
      const [letter, numberToRemove] = tile
      // Remove tiles from tileBag
      dispatch(removeTile([letter, numberToRemove]));
      // Add tile to player's rack
    }
  };
};
