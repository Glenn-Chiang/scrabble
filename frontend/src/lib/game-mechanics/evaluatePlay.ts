// Check that tiles in playGrid are either all in the same row or all in the same column
export function validateTilePlacement(playGrid: string[][], tileGrid: string[][]) {
  const playedRow = getPlayedRow(playGrid)
  const playedColumn = getPlayedColumn(playGrid)
  const sameRow = playedRow != -1
  const sameColumn = playedColumn != -1
  if (!sameRow && !sameColumn) return false
  
  // If play is horizontal, check that there are no empty cells between leftmost played tile and rightmost played tile  
  if (sameRow && !checkHorizontalAdjacency(playGrid, tileGrid, playedRow)) {
    return false
  }
  // If play is vertical, check that there are no empty cells between topmost played tile and bottommost played tile
  if  (sameColumn && !checkVerticalAdjacency(playGrid, tileGrid, playedColumn)) {
    return false
  }

  return true
}

// If play is horizontal, check that there are no empty cells between leftmost played tile and rightmost played tile  
function checkHorizontalAdjacency(playGrid: string[][], tileGrid: string[][], playedRow: number) {
  const playedColIndices = []
  for (let col = 0; col < playGrid[0].length; col++) {
    if (playGrid[playedRow][col]) {
      playedColIndices.push(col)
    }
  }

  const leftmostCol = playedColIndices[0]
  const rightmostCol = playedColIndices[playedColIndices.length - 1]
  for (let col = leftmostCol + 1; col < rightmostCol; col++) {
    if (!tileGrid[playedRow][col] && !playGrid[playedRow][col]) {
      return false
    }
  }
  return true
}

// If play is vertical, check that there are no empty cells between topmost played tile and bottommost played tile
function checkVerticalAdjacency(playGrid: string[][], tileGrid: string[][], playedColumn: number) {
  const playedRowIndices = []
  for (let row = 0; row < playGrid.length; row++) {
    if (playGrid[row][playedColumn]) {
      playedRowIndices.push(row)
    }
  }

  const topRow = playedRowIndices[0]
  const bottomRow = playedRowIndices[playedRowIndices.length - 1]
  for (let row = topRow + 1; row < bottomRow; row++) {
    if (!tileGrid[row][playedColumn] && !playGrid[row][playedColumn]) {
      return false
    }
  }
  
  return true
}


// Find row in which tiles were played in a horizontal play
export function getPlayedRow(grid: string[][]) {
  let playedRow = -1;
  for (let row = 0; row < grid.length; row++) {
    if (grid[row].some((cell) => cell != "")) {
      if (playedRow != -1) {
        // If there are tiles played in more than 1 row, we determine that the play was not horizontal and return -1
        return -1;
      }
      playedRow = row;
    }
  }
  return playedRow;
}

// Find column in which tiles were played in a vertical play
export function getPlayedColumn(grid: string[][]) {
  let playedColumn = -1;
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col]) {
        if (playedColumn != -1) {
          // If there are tiles played in more than 1 column, we determine that the play was not vertical and return -1
          return -1;
        }
        playedColumn = col;
      }
    }
  }
  return playedColumn;
}

