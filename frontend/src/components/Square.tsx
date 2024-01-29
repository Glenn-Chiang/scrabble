import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "../redux-config/store";
import { Tile } from "./Tile";

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
    return <Tile letter={tile} />;
  }

  const color = getSquareColor(value);
  return (
    <div
      className={`${color} text-white rounded min-w-10 h-10 flex justify-center items-center`}
    >
      {value === "*" ? <FontAwesomeIcon icon={faStar} /> : value}
    </div>
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
