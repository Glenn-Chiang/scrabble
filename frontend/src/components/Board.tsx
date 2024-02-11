import { boardGrid } from "../lib/game-constants/board";
import { useAppSelector } from "../redux-config/store";
import { Square } from "./Square";

export const Board = () => {
  const gameProgress = useAppSelector((state) => state.gameState.gameProgress);
  return (
    <ul
      className={`w-full overflow-x-scroll sm:overflow-hidden sm:w-auto flex flex-col gap-1 ${
        gameProgress === "post-game" && "opacity-60"
      }`}
    >
      {boardGrid.map((row, i) => (
        <Row key={i} values={row} rowIndex={i} />
      ))}
    </ul>
  );
};

const Row = ({ values, rowIndex }: { values: string[]; rowIndex: number }) => {
  return (
    <ul className="flex gap-1 w-screen sm:w-full ">
      {values.map((value, i) => (
        <Square key={i} value={value} row={rowIndex} col={i} />
      ))}
    </ul>
  );
};
