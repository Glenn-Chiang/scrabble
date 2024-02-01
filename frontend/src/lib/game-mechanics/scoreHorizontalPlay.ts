import { BoardValue } from "../game-constants/board";
import { tilePoints as tileBasePoints } from "../game-constants/tiles";

// Calculate score for a horizontal play
export function scoreHorizontalPlay(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedRow: number
): { word: string; score: number }[] {
  // Array of each word formed with its corresponding score
  const wordScores = [];
  const horizontalWordScore = scoreHorizontalWord(
    tileGrid,
    playGrid,
    boardGrid,
    playedRow
  );
  const verticalWordScores = scoreVerticalWords(tileGrid, playGrid, playedRow);
  wordScores.push(horizontalWordScore, ...verticalWordScores);
  return wordScores;
}

function scoreVerticalWords(
  tileGrid: string[][],
  playGrid: string[][],
  playedRow: number
): {word: string, score: number}[] {
  const wordScores: {word: string, score: number}[] = [];
  // For each played tile, add points for adjacent tiles above it and below it in the same column
  for (let col = 0; col < playGrid[0].length; col++) {
    if (playGrid[playedRow][col]) {
      const wordScore = scoreVerticalWord(col)
      if (wordScore) {
        wordScores.push(wordScore);
      }
    }
  }

  function scoreVerticalWord(col: number) {
    let score = 0;
    const letters = [];

    // Add points for adjacent fixed tiles below played tile
    for (let row = playedRow; row < tileGrid.length; row++) {
      const letter = playGrid[row][col] || tileGrid[row][col];
      if (letter) {
        score += tileBasePoints[letter];
        letters.push(letter);
      } else {
        // If there are no more adjacent tiles below, stop adding points
        break;
      }
    }

    // Add points for adjacent fixed tiles above played tile
    for (let row = playedRow - 1; row >= 0; row--) {
      const letter = tileGrid[row][col];
      if (letter) {
        score += tileBasePoints[letter];
        letters.unshift(letter);
      } else {
        // If there are no more adjacent tiles above, stop adding points
        break;
      }
    }
    if (letters.length === 1) return null
    const word = letters.join("");
    return { word, score };
  }

  return wordScores;
}

// Calculate the score only for the horizontal word formed during the current horizontal play
// I am assuming that only 1 horizontal word can be formed in a horizontal play. This may be proven wrong.
function scoreHorizontalWord(
  tileGrid: string[][],
  playGrid: string[][],
  boardGrid: BoardValue[][],
  playedRow: number
): {word: string, score: number} {
  let score = 0;
  let wordMultiplier = 1;

  // Indices of columns in playGrid where a tile is present
  const playedColIndices = [];
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
      playedColIndices.push(col);
    }
  }
  // Index of leftmost column in playGrid where a tile is present
  const leftPlayedCol = playedColIndices[0];
  // Index of rightmost column in playGrid where a tile is present
  const rightPlayedCol = playedColIndices[playedColIndices.length - 1];

  // Indices of columns in tileGrid where a fixed tile is present AND the fixed tile is connected to the played tiles
  // In other words, these are the columns in which there is a fixed tile that is part of the horizontal word formed in the horizontal play
  const fixedColIndices = [];

  // Add points for all adjacent fixed tiles to the right of the rightmost played tile
  for (let col = rightPlayedCol + 1; col < tileGrid[0].length; col++) {
    const letter = tileGrid[playedRow][col];
    // If any tile has been placed in this cell, add base points for that tile
    if (letter) {
      score += tileBasePoints[letter];
      fixedColIndices.push(col);
    } else {
      // If there are no more adjacent tiles to the right, stop adding points
      break;
    }
  }

  // Index of rightmost column in tileGrid where a tile is present AND that tile is connected to the played tiles
  const rightFixedCol = fixedColIndices[fixedColIndices.length - 1] || -1;

  // Add points for all fixed tiles between the leftmost and rightmost played tiles, inclusive
  for (let col = leftPlayedCol; col <= rightPlayedCol; col++) {
    const letter = tileGrid[playedRow][col];
    if (letter) {
      score += tileBasePoints[letter];
      fixedColIndices.push(col);
    }
  }

  // Add points for all adjacent tiles to the left of the leftmost played tile
  for (let col = leftPlayedCol - 1; col >= 0; col--) {
    const letter = tileGrid[playedRow][col];
    if (letter) {
      score += tileBasePoints[letter];
      fixedColIndices.push(col);
    } else {
      // If there are no more adjacent tiles to the left, stop adding points
      break;
    }
  }

  // Index of leftmost column in tileGrid where a tile is present AND that tile is connected to the played tiles
  const leftFixedCol = fixedColIndices[fixedColIndices.length - 1] || -1;

  // If this is the first play in the game, fixedColIndices will be empty. In that case, we simply set firstLetterCol and lastLetterCol to the leftPlayedCol and rightPlayedCol respectively
  // Index of column containing the leftmost tile (i.e. the first letter) that forms the horizontal word
  const firstLetterCol =
    leftFixedCol == -1 ? leftPlayedCol : Math.min(leftFixedCol, leftPlayedCol);
  // Index of column containing the rightmost tile (i.e. the last letter) that forms the horizontal word
  const lastLetterCol =
    rightFixedCol == -1
      ? rightPlayedCol
      : Math.max(rightFixedCol, rightPlayedCol);

  const word = getHorizontalWord(
    playGrid,
    tileGrid,
    playedRow,
    firstLetterCol,
    lastLetterCol
  );

  return { word, score: score * wordMultiplier };
}

function getHorizontalWord(
  playGrid: string[][],
  tileGrid: string[][],
  playedRow: number,
  firstLetterCol: number,
  lastLetterCol: number
) {
  const letters = [];
  for (let col = firstLetterCol; col <= lastLetterCol; col++) {
    const letter = playGrid[playedRow][col] || tileGrid[playedRow][col];
    letters.push(letter);
  }
  return letters.join("");
}
