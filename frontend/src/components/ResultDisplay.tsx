import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../redux-config/store";
import { StartButton } from "./ActionButtons";

export function ResultDisplay() {
  const playerScores = useAppSelector((state) => state.playerScores);
  const winnerId =
    playerScores[0] > playerScores[1]
      ? 1
      : playerScores[0] < playerScores[1]
      ? 2
      : 0;

  return (
    <div className=" w-full lg:w-1/2 flex flex-col items-center gap-4">

    <div className="w-full bg-teal-50 text-teal-500 shadow-teal-100 shadow rounded-md flex justify-center p-4 font-bold">
      {winnerId ? (
        <p className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faTrophy} />
          Player {winnerId} wins!
        </p>
      ) : (
        <p>It's a tie!</p>
      )}
    </div>
    <div className="w-full bg-white rounded-md p-4 flex flex-col gap-2 items-center">
      Start a new game?
      <StartButton/>
    </div>
    </div>
  );
}
