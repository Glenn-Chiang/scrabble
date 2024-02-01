export function validateTilePlacement(
  playGrid: string[][],
  tileGrid: string[][]
) {
  const playedRow = getPlayedRow(playGrid);
  const playedColumn = getPlayedColumn(playGrid);
  const sameRow = playedRow != -1;
  // Check that tiles in playGrid are either all in the same row or all in the same column
  const sameColumn = playedColumn != -1;
  if (!sameRow && !sameColumn) {
    return false;
  }

  // If play is horizontal, check that there are no empty cells between leftmost played tile and rightmost played tile
  if (sameRow) {
    const playedColIndices = [];
    for (let col = 0; col < playGrid[0].length; col++) {
      if (playGrid[playedRow][col]) {
        playedColIndices.push(col);
      }
    }
    if (
      !checkHorizontalAdjacency(playGrid, tileGrid, playedRow, playedColIndices)
    ) {
      return false;
    }
    if (!checkUnity(playGrid, tileGrid, [playedRow, playedColIndices[0]])) {
      return false;
    }
  }
  // If play is vertical, check that there are no empty cells between topmost played tile and bottommost played tile
  if (sameColumn) {
    const playedRowIndices = [];
    for (let row = 0; row < playGrid.length; row++) {
      if (playGrid[row][playedColumn]) {
        playedRowIndices.push(row);
      }
    }
    if (
      !checkVerticalAdjacency(
        playGrid,
        tileGrid,
        playedColumn,
        playedRowIndices
      )
    ) {
      return false;
    }
    if (!checkUnity(playGrid, tileGrid, [playedRowIndices[0], playedColumn])) {
      return false;
    }
  }

  return true;
}

// Check that at least 1 played tile is directly adjacent to a fixed tile
// Intuition: As long as at least 1 played tile is directly adjacent to a fixed tile, we can determine that all tiles are connected and thus all tiles should be visited by dfs if we start from one of the played tiles
function checkUnity(
  playGrid: string[][],
  tileGrid: string[][],
  firstPlayedCell: [number, number]
) {
  // Starting from first played tile, run depth first search to visit all adjacent tiles
  const visited = Array.from({ length: playGrid.length }, () =>
    Array(playGrid[0].length).fill(false)
  );

  function dfs(row: number, col: number) {
    visited[row][col] = true;

    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const dir of directions) {
      const nextRow = row + dir[0];
      const nextCol = col + dir[1];
      if (
        nextRow >= 0 &&
        nextRow < playGrid.length &&
        nextCol >= 0 &&
        nextCol < playGrid[0].length &&
        (playGrid[nextRow][nextCol] || tileGrid[nextRow][nextCol]) && // only traverse cells that have tiles fixed or played on them
        !visited[nextRow][nextCol] // skip tiles that have already been visited
      ) {
        dfs(nextRow, nextCol);
      }
    }
  }

  dfs(firstPlayedCell[0], firstPlayedCell[1]);

  console.log("visited:", visited);

  // Check if first tile in tileGrid (we could also have chosen any other tile in tileGrid) has been visited
  for (let row = 0; row < tileGrid.length; row++) {
    for (let col = 0; col < tileGrid[0].length; col++) {
      if (tileGrid[row][col]) {
        if (visited[row][col]) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  return true;
}

// If play is horizontal, check that there are no empty cells between leftmost played tile and rightmost played tile
function checkHorizontalAdjacency(
  playGrid: string[][],
  tileGrid: string[][],
  playedRow: number,
  playedColIndices: number[]
) {
  const leftmostCol = playedColIndices[0];
  const rightmostCol = playedColIndices[playedColIndices.length - 1];
  for (let col = leftmostCol + 1; col < rightmostCol; col++) {
    if (!tileGrid[playedRow][col] && !playGrid[playedRow][col]) {
      return false;
    }
  }
  return true;
}

// If play is vertical, check that there are no empty cells between topmost played tile and bottommost played tile
function checkVerticalAdjacency(
  playGrid: string[][],
  tileGrid: string[][],
  playedColumn: number,
  playedRowIndices: number[]
) {
  const topRow = playedRowIndices[0];
  const bottomRow = playedRowIndices[playedRowIndices.length - 1];
  for (let row = topRow + 1; row < bottomRow; row++) {
    if (!tileGrid[row][playedColumn] && !playGrid[row][playedColumn]) {
      return false;
    }
  }

  return true;
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
        break;
      }
    }
  }
  return playedColumn;
}
