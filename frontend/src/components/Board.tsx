import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createBoard } from "../lib/game-constants"
import { faStar } from "@fortawesome/free-regular-svg-icons"

export const Board = () => {
  const boardMatrix = createBoard()
  return (
    <ul className="w-screen overflow-x-scroll sm:w-auto flex flex-col gap-1">
      {boardMatrix.map((row, i) => <Row key={i} values={row}/>)}
    </ul>
  )
}

const Row = ({values}: {values: string[]}) => {
  return (
    <ul className="flex gap-1 w-screen sm:w-full ">
      {values.map((value, i) => <Square key={i} value={value}/>)}
    </ul>
  )
}

const Square = ({value}: {value: string}) => {
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