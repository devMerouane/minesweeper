import { MAX_COLUMN, MAX_ROW, NUMBER_BOMBS } from '../constants';
import { Cell, CellState, CellValue } from '../types';

const generateRandomNumber = (number: number): number => Math.floor(Math.random() * number);

export const generateCells = (): Cell[][] => {
  const cells: Cell[][] = [];
  let cellPosition = 0;

  // generating all cells
  for (let row = 0; row < MAX_ROW; row += 1) {
    cells.push([]);
    for (let col = 0; col < MAX_COLUMN; col += 1) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.open,
        position: cellPosition,
      });
      cellPosition += 1;
    }
  }

  // place bombs
  let bombsPlaced = 0;
  while (bombsPlaced < NUMBER_BOMBS) {
    const randomRow = generateRandomNumber(MAX_ROW);
    const randomCol = generateRandomNumber(MAX_COLUMN);
    const currentCell = cells[randomRow][randomCol];

    if (currentCell.value !== CellValue.bomb) {
      cells[randomRow][randomCol].value = CellValue.bomb;
      bombsPlaced += 1;
    }
  }

  // calculate the number for every cell
  for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < MAX_COLUMN; columnIndex += 1) {
      const currentCell = cells[rowIndex][columnIndex];
      if (currentCell.value !== CellValue.bomb) {
        const topLeftBomb = rowIndex > 0 && columnIndex > 0 ? cells[rowIndex - 1][columnIndex - 1] : null;
        const topBomb = rowIndex > 0 ? cells[rowIndex - 1][columnIndex] : null;
        const topRightBomb = rowIndex > 0 && columnIndex < MAX_COLUMN - 1 ? cells[rowIndex - 1][columnIndex + 1] : null;
        const leftBomb = columnIndex > 0 ? cells[rowIndex][columnIndex - 1] : null;
        const rightBomb = columnIndex < MAX_COLUMN - 1 ? cells[rowIndex][columnIndex + 1] : null;
        const botLeftBomb = rowIndex < MAX_ROW - 1 && columnIndex > 0 ? cells[rowIndex + 1][columnIndex - 1] : null;
        const botBomb = rowIndex < MAX_ROW - 1 ? cells[rowIndex + 1][columnIndex] : null;
        const botRightBomb = rowIndex < MAX_ROW - 1 && columnIndex < MAX_ROW - 1 ? cells[rowIndex + 1][columnIndex + 1] : null;

        let numberOfbombs = 0;

        if (topLeftBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }
        if (topBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }
        if (topRightBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }
        if (leftBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }
        if (rightBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }
        if (botLeftBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }
        if (botBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }
        if (botRightBomb?.value === CellValue.bomb) {
          numberOfbombs += 1;
        }

        cells[rowIndex][columnIndex].value = numberOfbombs;
      }
    }
  }

  return cells;
};

export const countNumberOfBombs = (array: Cell[][]): number => {
  const flatedArray = array.flat();
  let numberOfBombs = 0;

  for (let i = 0; i < flatedArray.length; i += 1) {
    if (flatedArray[i].value === CellValue.bomb) {
      numberOfBombs += 1;
    }
  }

  return numberOfBombs;
};
