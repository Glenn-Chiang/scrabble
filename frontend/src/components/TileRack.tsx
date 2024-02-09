import { UnplayedTile } from "./Tile";

export const TileRack = ({ tiles }: { tiles: string[] }) => {
  return (
    <ul className="flex gap-2 items-center">
      {tiles.map((tile, i) => (
        <UnplayedTile key={i} letter={tile} index={i}/>
      ))}
    </ul>
  );
};

