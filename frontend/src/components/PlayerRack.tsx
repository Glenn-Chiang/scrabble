import { tilePoints } from "../lib/game-constants/tiles";

export const PlayerRack = ({ tiles }: { tiles: string[] }) => {
  return (
    <ul className="flex gap-2 items-center">
      {tiles.map((tile, i) => (
        <Tile key={i} letter={tile} />
      ))}
    </ul>
  );
};

const Tile = ({ letter }: { letter: string }) => {
  const points = tilePoints[letter];
  return (
    <div className="bg-white rounded w-10 h-10 flex justify-center items-center shadow font-bold relative">
      {letter === "BLANK" ? "" : letter}
      <span className="absolute bottom-0 right-1 text-xs">{points}</span>
    </div>
  );
};
