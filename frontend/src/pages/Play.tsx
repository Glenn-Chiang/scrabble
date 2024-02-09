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

export default function Play() {
  const currentPlayerId = useCurrentPlayer();
  const playerTiles = useAppSelector(
    (state) => state.playerTiles[currentPlayerId]
  );

  const drawTiles = useDrawTiles();
  const evaluatePlay = useEvaluatePlay();
  const endTurn = useEndTurn();

  const turnState = useAppSelector((state) => state.gameState.turnState);

  // TODO: start button should only be enabled before first turn

  const handleStart = () => {
    // Draw first 7 tiles for both players
    drawTiles(0)
    drawTiles(1)
  }

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
        <button
          onClick={() => evaluatePlay()}
          className="bg-teal-500 text-white p-2"
        >
          Check
        </button>
        {turnState === "valid" && (
          <button
            onClick={() => endTurn()}
            className="bg-rose-500 text-white p-2"
          >
            End turn
          </button>
        )}
      </div>
      <TileRack tiles={playerTiles} />
    </main>
  );
}
