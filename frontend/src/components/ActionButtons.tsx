import { useDispatch } from "react-redux";
import { ActionButton } from "../components/ActionButton";
import { rackLimit } from "../lib/game-constants/tiles";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { useEndGame } from "../lib/game-mechanics/endGame";
import { useEndTurn } from "../lib/game-mechanics/endTurn";
import { useEvaluatePlay } from "../lib/game-mechanics/evaluatePlay";
import { useSkipTurn } from "../lib/game-mechanics/skipTurn";
import { gameStateSlice } from "../redux-config/slices/gameState";
import { useAppDispatch, useAppSelector } from "../redux-config/store";


export function QuitButton() {
  const endGame = useEndGame();
  return (
    <ActionButton
      label="Quit game"
      className="bg-rose-500 text-white"
      onClick={() => endGame()}
    />
  );
}

export function StartButton() {
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

export function CheckButton() {
  const evaluatePlay = useEvaluatePlay();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="Check play"
      className="bg-sky-50 text-sky-500 "
      onClick={() => evaluatePlay()}
      disabled={turnState === "exchanging" || turnState === "valid"}
    />
  );
}

export function ExchangeTilesButton() {
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

export function SkipTurnButton() {
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

export function EndTurnButton() {
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
