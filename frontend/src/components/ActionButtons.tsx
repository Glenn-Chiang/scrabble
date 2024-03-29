import { faCheckCircle, faStopCircle } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightRotate, faFastForward, faPlay, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { ActionButton } from "../components/ActionButton";
import { useEndGame } from "../lib/game-mechanics/endGame";
import { useEvaluatePlay } from "../lib/game-mechanics/evaluatePlay";
import { useSkipTurn } from "../lib/game-mechanics/skipTurn";
import { useStartGame } from "../lib/game-mechanics/startGame";
import { useSubmitPlay } from "../lib/game-mechanics/submitPlay";
import { gameStateSlice } from "../redux-config/slices/gameState";
import { useAppSelector } from "../redux-config/store";
import { useState } from "react";


export function QuitButton() {
  const endGame = useEndGame();
  return (
    <ActionButton
      label="Quit game"
      icon={faStopCircle}
      className="bg-rose-500 text-white"
      onClick={() => endGame()}
    />
  );
}

export function StartButton() {
 const startGame = useStartGame()
  return (
    <ActionButton
      label="Start"
      icon={faPlay}
      className="bg-sky-500 text-white shadow shadow-sky-500 w-full sm:w-1/2"
      onClick={startGame}
    />
  );
}

export function CheckButton() {
  const turnState = useAppSelector((state) => state.gameState.turnState);
  const [checking, setChecking] = useState(false)
  const evaluatePlay = useEvaluatePlay();

  const handleClick = async () => {
    setChecking(true)
    await evaluatePlay()
    setChecking(false)
  }

  return (
    <ActionButton
      label={checking ? "Checking..." : "Check play"}
      icon={faCheckCircle}
      className="bg-sky-100 text-sky-500 "
      onClick={handleClick}
      disabled={checking || turnState === "exchanging" || turnState === "exchanged" }
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
      icon={faRefresh}
      className="bg-cyan-50 text-cyan-500"
      onClick={handleClick}
      disabled={turnState === "exchanging" || turnState === "exchanged"}
    />
  );
}

export function SkipTurnButton() {
  const skipTurn = useSkipTurn();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="Skip turn"
      icon={faArrowRightRotate}
      className="bg-rose-50 text-rose-400"
      onClick={() => skipTurn()}
      disabled={turnState === 'exchanged'}
    />
  );
}

export function SubmitButton() {
  const submitPlay = useSubmitPlay();
  const turnState = useAppSelector((state) => state.gameState.turnState);

  return (
    <ActionButton
      label="End turn"
      icon={faFastForward}
      className="bg-sky-500 text-white shadow shadow-sky-500"
      disabled={turnState !== "valid" && turnState !== 'exchanged'}
      onClick={() => submitPlay()}
    />
  );
}
