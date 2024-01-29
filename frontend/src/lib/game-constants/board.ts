// Initializes an empty board
export const boardRows = 15

export function createBoard(): string[][] {
  const boardMatrix = Array(boardRows);
  
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
    boardMatrix[i] = boardTopHalf[i]
    boardMatrix[boardRows - i - 1] = boardTopHalf[i]
  }
  // Initialize middle row
  boardMatrix[Math.floor(boardRows / 2)] = ['3W','','','2L','','','','*','','','','2L','','','3W']

  return boardMatrix
}

export const squares = ['', '2L', '3L', '2W', '3W']