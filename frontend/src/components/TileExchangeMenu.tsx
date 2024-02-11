import React from "react";
import { ActionButton } from "./ActionButton";
import { useAppDispatch, useAppSelector } from "../redux-config/store";
import { gameStateSlice } from "../redux-config/slices/gameState";
import { useExchangeTiles } from "../lib/game-mechanics/exchangeTiles";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";

export function TileExchangeMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <span>Select tiles to exchange</span>
      {children}
      <div className="flex gap-2">
        <ConfirmButton />
        <CancelButton />
      </div>
    </div>
  );
}

function ConfirmButton() {
  const selectedTileIndices = useAppSelector((state) => state.tileExchange);
  const currentPlayerIndex = useCurrentPlayer();
  const playerTiles = useAppSelector(
    (state) => state.playerTiles[currentPlayerIndex]
  );
  const selectedTiles = selectedTileIndices.map(
    (tileIndex) => playerTiles[tileIndex]
  );
  
  const exchangeTiles = useExchangeTiles();
  const dispatch = useAppDispatch()

  const handleClick = () => {
    exchangeTiles(selectedTiles);
    dispatch(gameStateSlice.actions.setTurnState('valid'))
  };
  return (
    <ActionButton
      label="Confirm"
      className="bg-cyan-500"
      onClick={handleClick}
    />
  );
}

function CancelButton() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(gameStateSlice.actions.setTurnState("pending"));
  };
  return (
    <ActionButton
      label="Cancel"
      className="bg-cyan-200 text-cyan-500 font-semibold"
      onClick={handleClick}
    />
  );
}
