import { Board } from "../components/Board";
import { PlayerRack } from "../components/PlayerRack";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { selectPlayerTiles } from "../redux-config/slices/playerTiles";
import { selectTileBag } from "../redux-config/slices/tileBag";
import { useAppSelector } from "../redux-config/store";

export default function Play() {
  const drawTiles = useDrawTiles()
  const tileBag = useAppSelector(selectTileBag)
  const playerTiles = useAppSelector(selectPlayerTiles)

  console.log('tile bag:', tileBag)
  console.log('player tiles:', playerTiles)

  return (
    <main className="flex flex-col gap-4 justify-center items-center w-full">
      <Board/>
      <button onClick={() => drawTiles(1, 7)} className="bg-sky-500 text-white">
        Draw tiles
      </button>
      <PlayerRack tiles={playerTiles}/>
    </main>
  )
}