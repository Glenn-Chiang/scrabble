import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../redux-config/store";

export function InvalidDisplay() {
  const invalidWords = useAppSelector((state) => state.invalidWords);

  return (
    <div className="w-full lg:w-1/2 p-2 rounded bg-rose-50 text-rose-500 flex gap-2 items-center justify-center flex-col">
      <span className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faXmarkCircle} />
        Invalid {invalidWords.length > 0 ? "words" : "tile placement"}
      </span>
      {invalidWords.length > 0 && (
        <ul className="grid-cols-3 grid w-full px-4 justify-items-center">
          {invalidWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </ul>
      )}
    </div>
  );
}
