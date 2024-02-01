import { BoardValue } from "../game-constants/board";
import { tilePoints as tileBasePoints } from "../game-constants/tiles";
import { validateWord } from "./validateWord";

// Calculate the total score of a vertical play
// A vertical play is defined as a play in which all played tiles are placed in a single column
export function scoreVerticalPlay(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedColumn: number
) {
  const score =
    scoreVerticalWord(tileGrid, playGrid, boardGrid, playedColumn) +
    scoreHorizontalWords(tileGrid, playGrid, playedColumn);
  return score;
}

function scoreHorizontalWords(
  tileGrid: string[][],
  playGrid: string[][],
  playedColumn: number
) {
  let score = 0;

  for (let row = 0; row < playGrid.length; row++) {
    if (playGrid[row][playedColumn]) {
      // Add points for adjacent fixed tiles to the left of played tile
      for (let col = playedColumn + 1; col < tileGrid[0].length; col++) {
        const letter = tileGrid[row][col];
        if (letter) {
          score += tileBasePoints[letter];
        } else {
          // If there are no more adjacent tiles to the right, stop adding points for this row
          break;
        }
      }
      // Add points for adjacent fixed tiles to the right of played tile
      for (let col = playedColumn - 1; col >= 0; col--) {
        const letter = tileGrid[row][col];
        if (letter) {
          score += tileBasePoints[letter];
        } else {
          // If there are no more adjacent tiles to the left, stop adding points for this row
          break;
        }
      }
    }
  }

  return score;
}

// Calculate the score only for the vertical word formed during the current vertical play
// I am assuming that only 1 vertical word can be formed in a vertical play. This may be proven wrong.
function scoreVerticalWord(
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
      playedRowIndices.push(row);
    }
  }

  // Row index of topmost row where a tile was played
  const topPlayedRow = playedRowIndices[0];
  // Row index of bottommost row where a tile was played
  const bottomPlayedRow = playedRowIndices[playedRowIndices.length - 1];

  // Indices of rows in tileGrid where a fixed tile is present AND that tile is connected to the played tiles
  // In other words, these are the rows that contain a fixed tile that is part of the vertical word formed in the play
  const fixedRowIndices = [];

  // Add points for all adjacent fixed tiles below the bottom played tile
  for (let row = bottomPlayedRow; row < tileGrid.length; row++) {
    const letter = tileGrid[row][playedColumn];
    // If any tile has been fixed in this cell, add base points for this tile
    if (letter) {
      score += tileBasePoints[letter];
      fixedRowIndices.push(row);
    } else {
      // If there are no more adjacent tiles below, stop adding points
      break;
    }
  }
  
  // Index of bottommost row containing a fixed tile that is connected to the played tiles
  const bottomFixedRow = fixedRowIndices[fixedRowIndices.length - 1] || -1;

  // Add points for all fixed tiles between the topmost and bottommost played tiles
  for (let row = topPlayedRow; row <= bottomPlayedRow; row++) {
    const letter = tileGrid[row][playedColumn];
    if (letter) {
      score += tileBasePoints[letter];
      fixedRowIndices.push(row);
    }
  }

  // Add points for all adjacent fixed tiles above the top played tile
  for (let row = topPlayedRow - 1; row >= 0; row--) {
    const letter = tileGrid[row][playedColumn];
    if (letter) {
      score += tileBasePoints[letter];
      fixedRowIndices.push(row);
    } else {
      // If there are no more adjacent tiles above, stop adding points
      break;
    }
  }

  // Index of topmost row containing a fixed tile that is connected to the played tiles
  const topFixedRow = fixedRowIndices[fixedRowIndices.length - 1] || -1;

  // If this is the first play in the game, fixedRowIndices will be empty
  // In that case, we simply set firstLetterRow and lastLetterRow to topPlayedRow and bottomPlayedRow respectively

  // Index of row containing the topmost tile (i.e. the first letter) that forms the vertical word
  const firstLetterRow =
    topFixedRow == -1 ? topPlayedRow : Math.min(topFixedRow, topPlayedRow);
  // Index of row containing the bottommost tile (i.e. the last letter) that forms the vertical word
  const lastLetterRow =
    bottomFixedRow == -1
      ? bottomPlayedRow
      : Math.min(bottomFixedRow, bottomPlayedRow);

  const word = getVerticalWord(
    playGrid,
    tileGrid,
    playedColumn,
    firstLetterRow,
    lastLetterRow
  );

  return { word, score: score * wordMultiplier };
}

function getVerticalWord(
  playGrid: string[][],
  tileGrid: string[][],
  playedColumn: number,
  firstLetterRow: number,
  lastLetterRow: number
) {
  const letters = [];
  for (let row = firstLetterRow; row <= lastLetterRow; row++) {
    const letter = playGrid[row][playedColumn] || tileGrid[row][playedColumn];
    letters.push(letter);
  }
  return letters.join("");
}
