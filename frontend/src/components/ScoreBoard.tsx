import { useCurrentPlayer } from "../lib/game-mechanics/useCurrentPlayer";
import { useAppSelector } from "../redux-config/store";

export function ScoreBoard() {
  return (
    <section className="w-full flex items-start bg-white p-2 sm:p-4 shadow rounded">
      <ScoreCard playerId={0} />
      <ScoreCard playerId={1} />
    </section>
  );
}

function ScoreCard({ playerId }: { playerId: number }) {
  const score = useAppSelector((state) => state.playerScores[playerId]);
  const currentPlayerId = useCurrentPlayer();
  const isCurrentPlayer = currentPlayerId === playerId;

  return (
    <div
      className={`w-1/2 h-full flex justify-center p-2 flex-col items-center font-semibold ${
        isCurrentPlayer && "text-sky-500 rounded bg-sky-100"
      }`}
    >
      P{playerId + 1}
      <span className="text-2xl">{score}</span>
    </div>
  );
}
