import { Tile } from "./Tile";

export const PlayerRack = ({ tiles }: { tiles: string[] }) => {
  return (
    <ul className="flex gap-2 items-center">
      {tiles.map((tile, i) => (
        <Tile key={i} letter={tile} />
      ))}
    </ul>
  );
};

