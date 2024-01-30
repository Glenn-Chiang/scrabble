import { playGridSlice } from "../../redux-config/slices/playGrid"
import { tileGridSlice } from "../../redux-config/slices/tileGrid"
import { useAppDispatch, useAppSelector } from "../../redux-config/store"

export const useEndTurn = () => {
  // const tileGrid = useAppSelector(state => state.tileGrid)
  const playGrid = useAppSelector(state => state.playGrid)
  console.log(playGrid)

  const dispatch = useAppDispatch()
  
  return (): boolean => {
    const playIsValid = validatePlayGrid(playGrid)
    console.log('Valid play:', playIsValid)
    if (!playIsValid) return false;

    // Confirm placement of tiles into tileGrid. They will now be fixed.
    dispatch(tileGridSlice.actions.placeTiles(playGrid))
    // Clear the playGrid to prepare for next turn
    dispatch(playGridSlice.actions.clear())
    return true
  }
}

// check that tiles in playGrid are either all in the same row or all in the same column
function validatePlayGrid (grid: string[][]) {
  return checkSameRow(grid) || checkSameColumn(grid)
}

// Check whether all filled cells are in the same row
function checkSameRow(grid: string[][]) {
  // Number of rows that are completely empty
  const emptyRows = grid.filter(row => row.every(cell => cell === "")).length
  // If number of empty rows is total number of rows - 1, that means all filled cells are in the same row
  return emptyRows === grid.length - 1
}

// Check whether all filled cells are in the same column
function checkSameColumn(grid: string[][]) {
  let filledColumns = 0
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
    console.log(filledColumns)
    if (filledColumns > 1) {
      return false
    }
  }
  return true
}