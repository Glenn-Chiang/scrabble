// Initializes an empty board
export const boardRows = 15

function createBoard(): BoardValue[][] {
  const boardGrid = Array(boardRows);
  
  const boardTopHalf = [
    ['3W','','','2L','','','','3W','','','','2L','','','3W'],
    ['','2W','','','','3L','','','','3L','','','','2W',''],
    ['','','2W','','','','2L','','2L','','','','2W','',''],
    ['2L','','','2W','','','','2L','','','','2W','','','2L'],
    ['','','','','2W','','','','','','2W','','','',''],
    ['','3L','','','','3L','','','','3L','','','','3L',''],
    ['','','2L','','','','2L','','2L','','','','2L','',''],
  ]
  
  // Initialize top half and bottom half of board
  for (let i = 0; i < boardRows / 2; i++) {
    boardGrid[i] = boardTopHalf[i]
    boardGrid[boardRows - i - 1] = boardTopHalf[i]
  }
  // Initialize middle row
  boardGrid[Math.floor(boardRows / 2)] = ['3W','','','2L','','','','*','','','','2L','','','3W']

  return boardGrid
}

export const boardGrid: BoardValue[][] = createBoard()

export const squares = ['', '2L', '3L', '2W', '3W']
export type BoardValue = '' |'2L' | '3L' | '2W' | '3W'