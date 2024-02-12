import { tilePoints } from "../lib/game-constants/tiles";
import { selectedTileSlice } from "../redux-config/slices/selectedTile";
import { playGridSlice } from "../redux-config/slices/playGrid";
import { playerTilesSlice } from "../redux-config/slices/playerTiles";
import { useAppDispatch, useAppSelector } from "../redux-config/store";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { tileExchangeSlice } from "../redux-config/slices/tileExchange";
import { invalidWordsSlice } from "../redux-config/slices/invalidWords";
import { gameStateSlice } from "../redux-config/slices/gameState";
import { wordScoresSlice } from "../redux-config/slices/wordScores";

// Tile which has already been placed on the board on a previous turn. Cannot be removed.
export const FixedTile = ({ letter }: { letter: string }) => {
  const points = tilePoints[letter];

  return (
    <div
      className="rounded min-w-10 h-10 flex justify-center items-center font-bold relative 
        bg-white"
    >
      {letter === "*" ? "" : letter}
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
  const currentPlayerId = useCurrentPlayer();

  const handleClick = () => {
    // Remove tile from board
    dispatch(playGridSlice.actions.removeTile({ row, col }));
    // Return tile to player's tile rack
    dispatch(
      playerTilesSlice.actions.addTile({ playerId: currentPlayerId, letter })
    );
    // Reset words scores
    dispatch(wordScoresSlice.actions.reset())
    // Reset invalid words
    dispatch(invalidWordsSlice.actions.reset())
    dispatch(gameStateSlice.actions.setTurnState('pending'))
  };

  return (
    <button
      onClick={handleClick}
      className="rounded min-w-10 h-10 flex justify-center items-center shadow font-bold relative 
        bg-white hover:shadow-lg text-sky-400"
    >
      {letter === "*" ? "" : letter}
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
  const turnState = useAppSelector((state) => state.gameState.turnState);

  // Tile that is selected to be PLAYED
  const tileIndexForPlay = useAppSelector(
    (state) => state.selectedTile.selectedTileIndex
  );
  // Tiles that are selected to be EXCHANGED
  const tileIndicesForExchange = useAppSelector((state) => state.tileExchange);

  const handleClick = () => {
    if (turnState === "exchanging") {
      // Select tile to be exchanged
      dispatch(tileExchangeSlice.actions.selectTile(index));
    } else {
      dispatch(selectedTileSlice.actions.selectTile(index));
    }
  };

  const selectedForPlay =
    turnState !== "exchanging" && tileIndexForPlay === index;
  const selectedForExchange =
    turnState === "exchanging" && tileIndicesForExchange.includes(index);
  const isSelected = selectedForPlay || selectedForExchange;

  const points = tilePoints[letter];

  return (
    <button
      // disabled={turnState === "valid"}
      onClick={handleClick}
      className={`rounded w-10 h-10 flex justify-center items-center shadow font-bold relative ${
        isSelected
          ? "text-sky-400 bg-sky-50 border-sky-400 border-2"
          : "bg-white"
      }`}
    >
      {letter === "*" ? "" : letter}
      <span className="absolute bottom-0 right-1 text-xs">{points}</span>
    </button>
  );
};
