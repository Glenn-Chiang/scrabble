import { tilePoints } from "../lib/game-constants/tiles";


export const Tile = ({ letter, onClick }: { letter: string, onClick?: () => void }) => {
  const points = tilePoints[letter];
  return (
    <div onClick={onClick} className="bg-white rounded w-10 h-10 flex justify-center items-center shadow font-bold relative">
      {letter === "BLANK" ? "" : letter}
      <span className="absolute bottom-0 right-1 text-xs">{points}</span>
    </div>
  );
};

// Tile already placed on board
export const PlayedTile = ({letter}: {letter: string}) => {
  return <Tile letter={letter}/>
}

// Tile in player rack
export const PlayableTile = ({ letter }: { letter: string }) => {
  const handleClick = () => {
    //do stuff
  }
  return <Tile letter={letter} onClick={handleClick}/>
};
