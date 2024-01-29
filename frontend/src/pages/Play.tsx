import { Board } from "../components/Board";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { selectPlayerRack } from "../redux-config/slices/playerRack";
import { selectTileBag } from "../redux-config/slices/tileBag";
import { useAppSelector } from "../redux-config/store";

export default function Play() {
  const drawTiles = useDrawTiles()
  const tileBag = useAppSelector(selectTileBag)
  const playerRack = useAppSelector(selectPlayerRack)

  console.log('tile bag:', tileBag)
  console.log('player rack:', playerRack)

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <Board/>
      <button onClick={() => drawTiles(1, 7)} className="bg-sky-500 text-white">
        Draw tiles
      </button>
    </main>
  )
}