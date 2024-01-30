// Check that tiles in playGrid are either all in the same row or all in the same column
export function validateTilePlacement(grid: string[][]) {
  return checkSameRow(grid) || checkSameColumn(grid);
}

// function getPlayedPosition(grid: string[][]) {
//   const playedRow = getPlayedRow(grid)
//   const playedColumn = getPlayedColumn(grid)
  
//   // Invalid play due to tiles being placed in multiple rows and columns
//   if (playedRow == -1 && playedColumn == -1) {
//     return {direction: 'invalid'}
//   }
// }

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

// Check whether all filled cells are in the same row
function checkSameRow(grid: string[][]) {
  // Number of rows that are completely empty
  const emptyRows = grid.filter((row) =>
    row.every((cell) => cell === "")
  ).length;
  // If number of empty rows is total number of rows - 1, that means all filled cells are in the same row
  return emptyRows === grid.length - 1;
}

// Check whether all filled cells are in the same column
function checkSameColumn(grid: string[][]) {
  let filledColumns = 0;
  // Iterate over columns
  for (let col = 0; col < grid[0].length; col++) {
    // check if there is at least 1 filled cell in this column
    let columnIsFilled = false;
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col]) {
        columnIsFilled = true;
      }
    }
    if (columnIsFilled) {
      filledColumns++;
    }
    if (filledColumns > 1) {
      return false;
    }
  }
  return true;
}
