// Initializes an empty board
export function createBoard(): string[][] {
  const numRows = 15
  const boardMatrix = Array(numRows);
  
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
  for (let i = 0; i < numRows / 2; i++) {
    boardMatrix[i] = boardTopHalf[i]
    boardMatrix[numRows - i - 1] = boardTopHalf[i]
  }
  // Initialize middle row
  boardMatrix[Math.floor(numRows / 2)] = ['3W','','','2L','','','','*','','','','2L','','','3W']

  return boardMatrix
}

export const squares = ['', '2L', '3L', '2W', '3W']