import { Board } from "../components/Board";
import { InvalidDisplay } from "../components/InvalidDisplay";
import { ResultDisplay } from "../components/ResultDisplay";
import { ScoreBoard } from "../components/ScoreBoard";
import { TileExchangeMenu } from "../components/TileExchangeMenu";
import { TileRack } from "../components/TileRack";
import { WordsDisplay } from "../components/WordsDisplay";
import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { useAppSelector } from "../redux-config/store";
import {
  StartButton,
  QuitButton,
  CheckButton,
  ExchangeTilesButton,
  SkipTurnButton,
  SubmitButton,
} from "../components/ActionButtons";

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
        {gameProgress !== "post-game" && <WordsDisplay />}
      </div>
      {gameProgress === "pre-game" && <StartButton />}
      {gameProgress === "in-game" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-4 rounded-md w-full">
          <ExchangeTilesButton />
          <SkipTurnButton />
          <CheckButton />
          <SubmitButton />
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
      {(turnState === "invalid") && (
        <InvalidDisplay />
      )}
      {gameProgress === "post-game" && <ResultDisplay />}
      <Board />
      {gameProgress === "in-game" && <QuitButton />}
    </main>
  );
}
