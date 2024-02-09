import { Board } from "../components/Board";
import { InvalidDisplay } from "../components/InvalidDisplay";
import { ScoreBoard } from "../components/ScoreBoard";
import { TileRack } from "../components/TileRack";
import { WordsDisplay } from "../components/WordsDisplay";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { useEndTurn } from "../lib/game-mechanics/endTurn";
import { useEvaluatePlay } from "../lib/game-mechanics/evaluatePlay";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { useAppSelector } from "../redux-config/store";

export default function Play() {
  const currentPlayerId = useCurrentPlayer();
  const drawTiles = useDrawTiles();
  const playerTiles = useAppSelector(
    (state) => state.playerTiles[currentPlayerId]
  );

  const evaluatePlay = useEvaluatePlay();
  const endTurn = useEndTurn();

  const turnState = useAppSelector((state) => state.gameState.turnState);

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
        <button
          onClick={() => drawTiles(currentPlayerId)}
          className="bg-sky-500 text-white p-2"
        >
          Draw tiles
        </button>
        <button
          onClick={() => evaluatePlay()}
          className="bg-teal-500 text-white p-2"
        >
          Check
        </button>
        <button
          onClick={() => endTurn()}
          className="bg-rose-500 text-white p-2"
        >
          End turn
        </button>
      </div>
      <TileRack tiles={playerTiles} />
    </main>
  );
}
