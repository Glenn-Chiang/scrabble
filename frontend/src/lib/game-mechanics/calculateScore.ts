import { BoardValue } from "../game-constants/board";
import { tilePoints as tileBasePoints } from "../game-constants/tiles";

// Calculate score for a horizontal play
export function calculateHorizontalPlayScore(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedRow: number
) {
  const score = calculateHorizontalWordScore(
    tileGrid,
    playGrid,
    boardGrid,
    playedRow
  );
  return score;
}

// Calculate the score only for the horizontal word formed during the current horizontal play
// I am assuming that only 1 horizontal word can be formed in a horizontal play. Feel free to challenge this assumption.
export function calculateHorizontalWordScore(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedRow: number
) {
  let score = 0;
  let wordMultiplier = 1;

  // Column indices of played tiles
  const playedColumnIndices = [];
  // Add points for played tiles only, while recording their column indices
  for (let col = 0; col < playGrid[0].length; col++) {
    const playedLetter = playGrid[playedRow][col];
    // Multiply base tilePoints with bonus value offerded by boardGrid
    if (playedLetter) {
      let tilePoints = tileBasePoints[playedLetter];
      const boardValue = boardGrid[playedRow][col];
      switch (boardValue) {
        case "2L":
          tilePoints *= 2;
          break;
        case "3L":
          tilePoints *= 3;
          break;
        case "2W":
          wordMultiplier *= 2;
          break;
        case "3W":
          wordMultiplier *= 3;
      }
      score += tilePoints;
      playedColumnIndices.push(col);
    }
  }
  // Column index of leftmost column where a tile was played
  const leftmostPlayedCol = playedColumnIndices[0];
  // Column index of rightmost column where a tile was played
  const rightmostPlayedCol =
    playedColumnIndices[playedColumnIndices.length - 1];

  // Add points for all adjacent fixed tiles to the right of the rightmost played tile
  for (let col = rightmostPlayedCol + 1; col < tileGrid[0].length; col++) {
    const letter = tileGrid[playedRow][col];
    // If any tile has been placed in this cell, add base points for that tile
    if (letter) {
      score += tileBasePoints[letter];
    } else {
      // If there are no more adjacent tiles to the left, stop adding points
      break;
    }
  }

  // Add points for all fixed tiles between the leftmost and rightmost played tiles, inclusive
  for (let col = leftmostPlayedCol; col <= rightmostPlayedCol; col++) {
    const letter = tileGrid[playedRow][col];
    if (letter) {
      score += tileBasePoints[letter];
    }
  }

  // Add points for all adjacent tiles to the left of the leftmost played tile
  for (let col = leftmostPlayedCol - 1; col >= 0; col--) {
    const letter = tileGrid[playedRow][col];
    if (letter) {
      score += tileBasePoints[letter];
    } else {
      // If there are no more adjacent tiles to the left, stop adding points
      break;
    }
  }

  return score * wordMultiplier;
}

// Calculate score for a vertical play
export function calculateVerticalPlayScore(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedColumn: number
) {
  let score = 0;
  let wordMultiplier = 1;

  // Row indices of played tiles
  const playedRowIndices = [];
  // Add points for played tiles only, while recording their row indices
  for (let row = 0; row < playGrid.length; row++) {
    const playedLetter = playGrid[row][playedColumn];
    // Multiply base tilePoints with bonus value offered by boardGrid
    // Multiply base tilePoints with bonus value offerded by boardGrid
    if (playedLetter) {
      let tilePoints = tileBasePoints[playedLetter];
      const boardValue = boardGrid[row][playedColumn];
      switch (boardValue) {
        case "2L":
          tilePoints *= 2;
          break;
        case "3L":
          tilePoints *= 3;
          break;
        case "2W":
          wordMultiplier *= 2;
          break;
        case "3W":
          wordMultiplier *= 3;
      }
      score += tilePoints;
      playedRowIndices.push(row)
    }
  }

  // Row index of topmost row where a tile was played
  const topPlayedRow = playedRowIndices[0]
  // Row index of bottommost row where a tile was played
  const bottomPlayedRow = playedRowIndices[playedRowIndices.length - 1]
  
  // Add points for all adjacent fixed tiles below the bottom played tile
  for (let row = bottomPlayedRow; row < tileGrid.length; row++) {
    const letter = tileGrid[row][playedColumn]
    // If any tile has been fixed in this cell, add base points for this tile
    if (letter) {
      score += tileBasePoints[letter]
    } else {
      // If there are no more adjacent tiles below, stop adding points
      break
    }
  }

  // Add points for all fixed tiles between the topmost and bottommost played tiles
  for (let row = topPlayedRow; row <= bottomPlayedRow; row++) {
    const letter = tileGrid[row][playedColumn]
    if (letter) {
      score += tileBasePoints[letter]
    }
  }
  
  // Add points for all adjacent tiles
  for (let row = topPlayedRow - 1; row >= 0; row--) {
    const letter = tileGrid[row][playedColumn]
    if (letter) {
      score += tileBasePoints[letter]
    } else {
      // If there are no more adjacent tiles above, stop adding points
      break;
    }
  }

  return score * wordMultiplier;
}
