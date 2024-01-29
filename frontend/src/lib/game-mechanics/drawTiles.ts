import { useAppDispatch, useAppSelector } from "../../redux-config/store";
import { removeTile, selectTileBag } from "../../redux-config/slices/tileBag";
import { playerRackSlice } from "../../redux-config/slices/playerRack";

export const useDrawTiles = () => {
  const dispatch = useAppDispatch();
  const tileBag = useAppSelector(selectTileBag);

  return (player: number, numberToDraw: number) => {
    // Insert logic to randomly select given number of tiles from bag, taking into consideration the number of each tile remaining
    const selectedTiles: { [letter: string]: number } = getRandomTiles(
      { ...tileBag },
      numberToDraw
    );

    console.log(selectedTiles)

    for (const letter of Object.keys(selectedTiles)) {
      // Remove tiles from tileBag
      dispatch(removeTile([letter, selectedTiles[letter]]));
      // Add tile to player's rack
      dispatch(
        playerRackSlice.actions.addTile([letter, selectedTiles[letter]])
      );
    }
  };
};

const getRandomTiles = (
  tileBag: { [letter: string]: number },
  quota: number
) => {
  const letters = Object.keys(tileBag);

  // Can only draw letters that still have at least 1 tile
  const result: { [letter: string]: number } = {};
  let numberDrawn = 0;

  while (numberDrawn < quota) {
    const remainingLetters = letters.filter((letter) => tileBag[letter] > 0);
    const randomIndex = Math.floor(Math.random() * remainingLetters.length);
    const letter = remainingLetters[randomIndex];
    tileBag[letter] -= 1;
    numberDrawn++
    result[letter] = (result[letter] || 0) + 1;
  }
  console.log(result)
  return result;
};
