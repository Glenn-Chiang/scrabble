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

  // Add points for all connected fixed tiles to the right of the last played tile
  for (let col = rightmostPlayedCol + 1; col < tileGrid[0].length; col++) {
    const letter = tileGrid[playedRow][col];
    // If any tile has been placed in this cell, add base points for that tile
    if (letter) {
      score += tileBasePoints[letter];
    } else {
      // If there is no tile adjacent to the right of this tile, stop adding points
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

  // Add points for all connected tiles to the left of the first played tile
  for (let col = leftmostPlayedCol - 1; col >= 0; col--) {
    const letter = tileGrid[playedRow][col];
    if (letter) {
      score += tileBasePoints[letter];
    } else {
      // If there is no adjacent tile to the left of this tile, stop adding points
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
  return score;
}
