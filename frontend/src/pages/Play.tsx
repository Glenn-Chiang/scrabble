import { Board } from "../components/Board";
import { PlayerRack } from "../components/PlayerRack";
import { useDrawTiles } from "../lib/game-mechanics/drawTiles";
import { useEndTurn } from "../lib/game-mechanics/endTurn";
import { useAppSelector } from "../redux-config/store";

export default function Play() {
  const drawTiles = useDrawTiles()
  const playerTiles = useAppSelector(state => state.playerTiles)

  const endTurn = useEndTurn()

  return (
    <main className="flex flex-col gap-4 justify-center items-center w-full">
      <Board/>
      <div className="flex gap-2">
        <button onClick={() => drawTiles(1, 7)} className="bg-sky-500 text-white">
          Draw tiles
        </button>
        <button onClick={() => endTurn()} className="bg-teal-500 text-white">
          End turn
        </button>
      </div>
      <PlayerRack tiles={playerTiles}/>
    </main>
  )
}