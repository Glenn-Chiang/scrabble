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
  return <div>{letter === "BLANK" ? "" : letter}</div>;
};
