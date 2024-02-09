import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function InvalidDisplay() {
  return (
    <div className="p-2 rounded bg-white flex gap-2 items-center">
      <FontAwesomeIcon icon={faXmarkCircle} className=" text-red-500"/>
      Invalid play
    </div>
  )
}