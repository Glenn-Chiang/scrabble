import { playerTilesSlice } from "../../redux-config/slices/playerTiles";
import { removeTile, selectTileBag } from "../../redux-config/slices/tileBag";
import { useAppDispatch, useAppSelector } from "../../redux-config/store";

const rackLimit = 7

export const useDrawTiles = () => {
  const dispatch = useAppDispatch();
  const tileBag = useAppSelector(selectTileBag);
  const playerTiles = useAppSelector(state => state.playerTiles)

  return (playerId: number) => {
    const currentTileCount = playerTiles[playerId].length // Number of tiles the current player has in their rack
    const numberToDraw = rackLimit - currentTileCount 
    // TODO: Handle running out of tiles
    const selectedTiles: { [letter: string]: number } = getRandomTiles(
      { ...tileBag },
      numberToDraw
    );

    for (const letter of Object.keys(selectedTiles)) {
      const count = selectedTiles[letter]
      // Remove tiles from tileBag
      dispatch(removeTile([letter, count]));
      // Add tile to player's rack
      for (let i = 0; i < count; i++) {
        dispatch(playerTilesSlice.actions.addTile({playerId, letter: letter}))
      }
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

  return result;
};
