import { useDispatch } from "react-redux";
import { ActionButton } from "../components/ActionButton";
import { Board } from "../components/Board";
import { InvalidDisplay } from "../components/InvalidDisplay";
import { ScoreBoard } from "../components/ScoreBoard";
import { TileRack } from "../components/TileRack";
import { WordsDisplay } from "../components/WordsDisplay";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { useEndTurn } from "../lib/game-mechanics/endTurn";
import { useEvaluatePlay } from "../lib/game-mechanics/evaluatePlay";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { gameStateSlice } from "../redux-config/slices/gameState";
import { useAppSelector } from "../redux-config/store";
import { TileExchangeMenu } from "../components/TileExchangeMenu";
import { rackLimit } from "../lib/game-constants/tiles";

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
    drawTiles(0, rackLimit);
    drawTiles(1, rackLimit);
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
        <ExchangeTilesButton />
        <EndTurnButton />
      </div>
      {turnState === "exchanging" ? (
        <TileExchangeMenu>
          <TileRack tiles={playerTiles} />
        </TileExchangeMenu>
      ) : (
        <TileRack tiles={playerTiles} />
      )}
    </main>
  );
}

function CheckPlayButton() {
  const evaluatePlay = useEvaluatePlay();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="Check play"
      className="bg-teal-500"
      onClick={() => evaluatePlay()}
      disabled={turnState === "exchanging" || turnState === 'valid'}
    />
  );
}

function ExchangeTilesButton() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(gameStateSlice.actions.setTurnState("exchanging"));
  };
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="Exchange tiles"
      className="bg-cyan-500"
      onClick={handleClick} //TODO: Get letters to exchange
      disabled={turnState === 'exchanging' || turnState === 'valid'}
    />
  );
}

function EndTurnButton() {
  const endTurn = useEndTurn();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="End turn"
      className="bg-sky-500 animate-pulse"
      disabled={turnState !== "valid"}
      onClick={() => endTurn()}
    />
  );
}
