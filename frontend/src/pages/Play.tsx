import { useDispatch } from "react-redux";
import { ActionButton } from "../components/ActionButton";
import { Board } from "../components/Board";
import { InvalidDisplay } from "../components/InvalidDisplay";
import { ScoreBoard } from "../components/ScoreBoard";
import { TileExchangeMenu } from "../components/TileExchangeMenu";
import { TileRack } from "../components/TileRack";
import { WordsDisplay } from "../components/WordsDisplay";
import { rackLimit } from "../lib/game-constants/tiles";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { useEndTurn } from "../lib/game-mechanics/endTurn";
import { useEvaluatePlay } from "../lib/game-mechanics/evaluatePlay";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { gameStateSlice } from "../redux-config/slices/gameState";
import { useAppDispatch, useAppSelector } from "../redux-config/store";
import { useSkipTurn } from "../lib/game-mechanics/skipTurn";
import { useEndGame } from "../lib/game-mechanics/endGame";

export default function Play() {
  const currentPlayerId = useCurrentPlayer();
  const playerTiles = useAppSelector(
    (state) => state.playerTiles[currentPlayerId]
  );

  const turnState = useAppSelector((state) => state.gameState.turnState);
  const gameProgress = useAppSelector((state) => state.gameState.gameProgress);

  return (
    <main className="flex flex-col gap-4 justify-center items-center w-full">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <ScoreBoard />
        <WordsDisplay />
      </div>
      {gameProgress === "pre-game" && <StartButton />}
      {gameProgress === "in-game" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-4 rounded-md w-full">
          <PlaceTilesButton />
          <ExchangeTilesButton />
          <SkipTurnButton />
          <EndTurnButton />
        </div>
      )}

      {gameProgress === "in-game" &&
        (turnState === "exchanging" ? (
          <TileExchangeMenu>
            <TileRack tiles={playerTiles} />
          </TileExchangeMenu>
        ) : (
          <TileRack tiles={playerTiles} />
        ))}
      {(turnState === "invalid-placement" || turnState === "invalid-words") && (
        <InvalidDisplay />
      )}
      <Board />
      {gameProgress === "in-game" && <QuitButton />}
    </main>
  );
}

function QuitButton() {
  const endGame = useEndGame();
  return (
    <ActionButton
      label="Quit game"
      className="bg-rose-500 text-white"
      onClick={() => endGame()}
    />
  );
}

function StartButton() {
  const drawTiles = useDrawTiles();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(gameStateSlice.actions.setGameProgress("in-game"));
    // Draw first 7 tiles for both players
    drawTiles(0, rackLimit);
    drawTiles(1, rackLimit);
  };
  return (
    <ActionButton
      label="Start"
      className="bg-sky-500 text-white shadow shadow-sky-500 w-full sm:w-1/2"
      onClick={handleClick}
    />
  );
}

function PlaceTilesButton() {
  const evaluatePlay = useEvaluatePlay();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="Place tiles"
      className="bg-sky-50 text-sky-500 "
      onClick={() => evaluatePlay()}
      disabled={turnState === "exchanging" || turnState === "valid"}
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
      className="bg-cyan-50 text-cyan-500"
      onClick={handleClick}
      disabled={turnState === "exchanging" || turnState === "valid"}
    />
  );
}

function SkipTurnButton() {
  const skipTurn = useSkipTurn();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="Skip turn"
      className="bg-rose-50 text-rose-400"
      onClick={() => skipTurn()}
      disabled={turnState === "valid"}
    />
  );
}

function EndTurnButton() {
  const endTurn = useEndTurn();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="End turn"
      className="bg-sky-500 text-white shadow shadow-sky-500"
      disabled={turnState !== "valid"}
      onClick={() => endTurn()}
    />
  );
}
