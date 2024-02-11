import { playerTilesSlice } from "../../redux-config/slices/playerTiles";
import { removeTile } from "../../redux-config/slices/tileBag";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";

export const useDrawTiles = () => {
  const dispatch = useAppDispatch();
  const tileBag = useAppSelector(state => state.tileBag);

  return (playerId: number, numberToDraw: number) => {
    const selectedTiles: { [letter: string]: number } = getRandomTiles(
      { ...tileBag },
      numberToDraw
      );
      
    // If there are no more tiles in the bag, selectedTiles will be empty
    for (const letter of Object.keys(selectedTiles)) {
      const count = selectedTiles[letter]
      // Remove tiles from tileBag
      dispatch(removeTile([letter, count]));
      // Add tile to player's rack
      for (let i = 0; i < count; i++) {
        dispatch(playerTilesSlice.actions.addTile({playerId, letter: letter}))
      }
    }
    
    return selectedTiles
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

  while (numberDrawn < quota ) {
    // Array of letters that have at least 1 tile remaining
    const remainingLetters = letters.filter((letter) => tileBag[letter] > 0);
    if (remainingLetters.length === 0) {
      break
    }
    const randomIndex = Math.floor(Math.random() * remainingLetters.length);
    const letter = remainingLetters[randomIndex];
    tileBag[letter] -= 1;
    numberDrawn++
    result[letter] = (result[letter] || 0) + 1;
  }

  return result;
};
