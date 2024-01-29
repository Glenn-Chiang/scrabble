import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tileGridSlice } from "../redux-config/slices/tileGrid";
import { useAppDispatch, useAppSelector } from "../redux-config/store";
import { PlayedTile } from "./Tile";

interface SquareProps {
  value: string;
  row: number;
  col: number;
}

export const Square = ({ value, row, col }: SquareProps) => {
  const tileGrid = useAppSelector((state) => state.tileGrid);
  const tile = tileGrid[row][col];

  // If this square is occupied by a tile, render the tile instead of the empty square
  if (tile) {
    return <PlayedTile letter={tile} />;
  }

  return <EmptySquare value={value} row={row} col={col}/>;
};

export const EmptySquare = ({value, row, col}: SquareProps) => {
  const selectedTileIndex = useAppSelector(state => state.play.selectedTileIndex)
  const playerTiles = useAppSelector(state => state.playerTiles)
  const selectedLetter = playerTiles[selectedTileIndex]

  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(tileGridSlice.actions.placeTile({row, col, letter: selectedLetter}))
  };

  const color = getSquareColor(value);
  return (
    <button
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
