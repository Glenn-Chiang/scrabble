import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { useAppSelector } from "../redux-config/store"

export const Square = ({value}: {value: string}) => {
  const tileGrid = useAppSelector(state => state.tileGrid)
  const color = getSquareColor(value)
  return (
    <div className={`${color} text-white rounded min-w-10 h-10 flex justify-center items-center`}>
      {value === '*' ? <FontAwesomeIcon icon={faStar}/> : value}
    </div>
  )
}

const getSquareColor = (value: string) => {
  switch (value) {
    case '':
      return 'bg-sky-200/50'
    case '2L':
      return 'bg-sky-400'
    case '3L':
      return 'bg-sky-600'
    case '2W':
      return 'bg-yellow-500'
    case '3W':
      return 'bg-red-500'
    case '*':
      return 'bg-amber-500'
  }
}