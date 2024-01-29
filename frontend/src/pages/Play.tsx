import { Board } from "../components/Board";
import { PlayerRack } from "../components/PlayerRack";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { usePlayerTiles } from "../redux-config/slices/playerTiles";

export default function Play() {
  const drawTiles = useDrawTiles()
  const playerTiles = usePlayerTiles()

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