import { tilePoints } from "../lib/game-constants/tiles";
import { playSlice } from "../redux-config/slices/play";
import { useAppDispatch, useAppSelector } from "../redux-config/store";

// Tile already placed on board
export const PlayedTile = ({ letter }: { letter: string }) => {
  const points = tilePoints[letter];

  return (
    <div
      className="rounded w-10 h-10 flex justify-center items-center shadow font-bold relative 
        bg-white"
    >
      {letter === "BLANK" ? "" : letter}
      <span className="absolute bottom-0 right-1 text-xs">{points}</span>
    </div>
  );
};

// Tile in player rack
export const PlayableTile = ({
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
