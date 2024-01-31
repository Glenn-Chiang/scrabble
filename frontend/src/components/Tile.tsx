import { tilePoints } from "../lib/game-constants/tiles";
import { playSlice } from "../redux-config/slices/play";
import { playGridSlice } from "../redux-config/slices/playGrid";
import { playerTilesSlice } from "../redux-config/slices/playerTiles";
import { useAppDispatch, useAppSelector } from "../redux-config/store";

// Tile which has already been placed on the board on a previous turn. Cannot be removed.
export const FixedTile = ({ letter }: { letter: string }) => {
  const points = tilePoints[letter];

  return (
    <div
      className="rounded min-w-10 h-10 flex justify-center items-center font-bold relative 
        bg-white"
    >
      {letter === "BLANK" ? "" : letter}
      <span className="absolute bottom-0 right-1 text-xs">{points}</span>
    </div>
  );
};

interface PlayedTileProps {
  letter: string;
  row: number;
  col: number;
}

// Tile played during current turn. Can be removed from board
export const PlayedTile = ({ letter, row, col }: PlayedTileProps) => {
  const points = tilePoints[letter];
  const dispatch = useAppDispatch();

  const handleClick = () => {
    // Remove tile from board
    dispatch(playGridSlice.actions.removeTile({ row, col }));
    // Return tile to player's tile rack
    dispatch(playerTilesSlice.actions.addTile(letter))
  };

  return (
    <button
      onClick={handleClick}
      className="rounded min-w-10 h-10 flex justify-center items-center shadow font-bold relative 
        bg-white hover:shadow-lg"
    >
      {letter === "BLANK" ? "" : letter}
      <span className="absolute bottom-0 right-1 text-xs">{points}</span>
    </button>
  );
};

// Tile in player rack. Clicking a RackTile will select it such that when the player subsequently clicks on an empty square, the selected tile will be played on that square
export const UnplayedTile = ({
  letter,
  index,
}: {
  letter: string;
  index: number;
}) => {
  const dispatch = useAppDispatch();
  const selectedTileIndex = useAppSelector(
    (state) => state.play.selectedTileIndex
  );

  const handleClick = () => {
    dispatch(playSlice.actions.selectTile(index));
  };

  const isSelected = selectedTileIndex === index;

  const points = tilePoints[letter];
  return (
    <button
      onClick={handleClick}
      className={`rounded w-10 h-10 flex justify-center items-center shadow font-bold relative ${
        isSelected
          ? "text-sky-400 bg-sky-50 border-sky-400 border-2"
          : "bg-white"
      }`}
    >
      {letter === "BLANK" ? "" : letter}
      <span className="absolute bottom-0 right-1 text-xs">{points}</span>
    </button>
  );
};
