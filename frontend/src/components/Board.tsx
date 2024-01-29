import { createBoard } from "../lib/game-constants/board";
import { Square } from "./Square";

export const Board = () => {
  const boardMatrix = createBoard();
  return (
    <ul className="w-full overflow-x-scroll sm:overflow-hidden sm:w-auto flex flex-col gap-1">
      {boardMatrix.map((row, i) => (
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
