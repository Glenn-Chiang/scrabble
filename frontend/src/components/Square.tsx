import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { playGridSlice } from "../redux-config/slices/playGrid";
import { playerTilesSlice } from "../redux-config/slices/playerTiles";
import { useAppDispatch, useAppSelector } from "../redux-config/store";
import { FixedTile, PlayedTile } from "./Tile";

interface SquareProps {
  value: string;
  row: number;
  col: number;
}

export const Square = ({ value, row, col }: SquareProps) => {
  const tileGrid = useAppSelector((state) => state.tileGrid);
  const fixedTile = tileGrid[row][col];

  const playGrid = useAppSelector((state) => state.playGrid);
  const playedTile = playGrid[row][col];

  // If this square is occupied by a tile, render the tile instead of the empty square
  if (fixedTile) {
    return <FixedTile letter={fixedTile} />;
  }

  if (playedTile) {
    return <PlayedTile letter={playedTile} row={row} col={col} />;
  }

  return <EmptySquare value={value} row={row} col={col} />;
};

export const EmptySquare = ({ value, row, col }: SquareProps) => {
  const dispatch = useAppDispatch();

  const selectedTileIndex = useAppSelector(
    (state) => state.selectedTile.selectedTileIndex
  );
  const playerTiles = useAppSelector((state) => state.playerTiles);
  const currentPlayerId = useCurrentPlayer();
  const selectedLetter = playerTiles[currentPlayerId][selectedTileIndex];

  // If selected tile is blank i.e. selectedLetter is *, we prompt the user to choose the letter that the tile should represent
  

  // Clicking an empty square will place the selected tile on that square and remove it from the player's tile rack
  const handleClick = () => {
    // add tile to playGrid
    dispatch(
      playGridSlice.actions.placeTile({ row, col, letter: selectedLetter })
    );
    // remove tile from player rack
    dispatch(
      playerTilesSlice.actions.removeTile({
        playerId: currentPlayerId,
        letter: selectedLetter,
      })
    );
  };

  const color = getSquareColor(value);
  
  const turnState = useAppSelector((state) => state.gameState.turnState);
  const gameProgress = useAppSelector(state => state.gameState.gameProgress)

  return (
    <button
      disabled={gameProgress !== 'in-game' || turnState === 'exchanging' || turnState === 'exchanged'}
      onClick={handleClick}
      className={`${color} hover:shadow text-white rounded min-w-10 h-10 flex justify-center items-center`}
    >
      {value === "*" ? <FontAwesomeIcon icon={faStar} /> : value}
    </button>
  );
};

const getSquareColor = (value: string) => {
  switch (value) {
    case "":
      return "bg-sky-200/50";
    case "2L":
      return "bg-sky-400";
    case "3L":
      return "bg-sky-600";
    case "2W":
      return "bg-yellow-500";
    case "3W":
      return "bg-red-500";
    case "*":
      return "bg-amber-500";
  }
};
