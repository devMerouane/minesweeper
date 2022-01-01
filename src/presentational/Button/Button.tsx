import React from 'react';

import './button.css';
import { CellValue, CellState } from '../../types';

interface CellProps {
  state: CellState;
  value: CellValue;
  row: number;
  column: number;
  handleGameStart(): void;
  handleRightClick(row: number, column: number): (...args: any[]) => void;
}

const renderButton = (value: CellValue, state: CellState): React.ReactNode => {
  if (state === CellState.open) {
    switch (value) {
      case CellValue.bomb:
        return <span>💣</span>;
      case CellValue.none:
        return null;
      default:
        return value;
    }
  } else if (state === CellState.flag) {
    return <span>🚩</span>;
  }

  return null;
};

const Button: React.FC<CellProps> = ({ value, state, row, column, handleGameStart, handleRightClick }) => (
  <button
    type='button'
    aria-label='Cell'
    className={`cell cell-value__${value} ${state === CellState.open ? 'cell__active' : ''}`}
    onClick={handleGameStart}
    onContextMenu={handleRightClick(row, column)}
  >
    {renderButton(value, state)}
  </button>
);

export default Button;
