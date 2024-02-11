import { useEffect } from "react";
import { Board } from "../components/Board";
import { InvalidDisplay } from "../components/InvalidDisplay";
import { ScoreBoard } from "../components/ScoreBoard";
import { TileRack } from "../components/TileRack";
import { WordsDisplay } from "../components/WordsDisplay";
import { useEndTurn } from "../lib/game-mechanics/endTurn";
import { useEvaluatePlay } from "../lib/game-mechanics/evaluatePlay";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { useAppSelector } from "../redux-config/store";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { useExchangeTiles } from "../lib/game-mechanics/exchangeTiles";
import { useDispatch } from "react-redux";
import { gameStateSlice } from "../redux-config/slices/gameState";

export default function Play() {
  const currentPlayerId = useCurrentPlayer();
  const playerTiles = useAppSelector(
    (state) => state.playerTiles[currentPlayerId]
  );

  const drawTiles = useDrawTiles();

  const turnState = useAppSelector((state) => state.gameState.turnState);

  // TODO: start button should only be enabled before first turn

  const handleStart = () => {
    // Draw first 7 tiles for both players
    drawTiles(0);
    drawTiles(1);
  };

  return (
    <main className="flex flex-col gap-4 justify-center items-center w-full">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <ScoreBoard />
        <WordsDisplay />
      </div>
      {(turnState === "invalid-placement" || turnState === "invalid-words") && (
        <InvalidDisplay />
      )}
      <Board />
      <div className="flex gap-2">
        <button onClick={handleStart}>Start</button>
        <CheckPlayButton />
        <ExchangeTilesButton/>
        <EndTurnButton />
      </div>
      <TileRack tiles={playerTiles} />
    </main>
  );
}

function CheckPlayButton() {
  const evaluatePlay = useEvaluatePlay();

  return (
    <ActionButton
      label="Check play"
      className="bg-teal-500"
      onClick={() => evaluatePlay()}
    />
  );
}

function ExchangeTilesButton() {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(gameStateSlice.actions.setTurnState('exchanging'))
  }

  return (
    <ActionButton
      label="Exchange tiles"
      className="bg-yellow-500"
      onClick={handleClick} //TODO: Get letters to exchange
    />
  );
}

function EndTurnButton() {
  const endTurn = useEndTurn();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="End turn"
      className="bg-sky-500"
      disabled={turnState !== "valid"}
      onClick={() => endTurn()}
    />
  );
}

interface ActionButtonProps {
  label: string;
  className: string;
  disabled?: boolean;
  onClick: () => void;
}

function ActionButton({
  label,
  className,
  disabled,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        className,
        `p-2 shadow text-white ${disabled && "opacity-50"}`,
      ].join(" ")}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
