import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../redux-config/store";

export function InvalidDisplay() {
  const turnState = useAppSelector((state) => state.gameState.turnState);
  const invalidWords = useAppSelector((state) => state.invalidWords);

  return (
    <div className="w-full lg:w-1/2 p-2 rounded bg-rose-50 text-rose-500 flex gap-2 items-center justify-center flex-col">
      <span className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faXmarkCircle} />
        Invalid {turnState === "invalid-placement" ? "tile placement" : "words"}
      </span>
      {turnState === 'invalid-words' && (
        <ul className="grid-cols-3 grid w-full px-4 justify-items-center">
          {invalidWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </ul>
      )}
    </div>
  );
}
