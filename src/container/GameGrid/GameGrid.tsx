import React, { useState, useEffect } from 'react';

import './gamegrid.css';
import { generateCells } from '../../utils';
import { Face } from '../../types';

import Header from '../../presentational/Header';
import Button from '../../presentational/Button';

const GameGrid: React.FC = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(Face.smile);
  const [time, setTime] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  const handleMouseDown = (): void => {
    setFace(Face.oh);
  };

  const handleMouseUp = (): void => {
    setFace(Face.smile);
  };

  const handleGameStart = (): void => {
    if (!gameStart) {
      setGameStart(true);
    }
  };

  const handleResetGame = (): void => {
    if (gameStart) {
      setGameStart(false);
      setTime(0);
      setCells(generateCells());
    }
  };

  const handleRightClick =
    (rowParam: number, columnParam: number) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.preventDefault();
      console.log(rowParam, columnParam);
    };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.addEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (gameStart) {
      timer = setInterval(() => {
        setTime((state) => state + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameStart]);

  return (
    <div className='container'>
      <Header face={face} timer={time} handleResetGame={handleResetGame} />
      <div className='board'>
        {cells.map((row, rowIndex) =>
          row.map((column, columnIndex) => (
            <Button
              row={rowIndex}
              column={columnIndex}
              key={column.position}
              value={column.value}
              state={column.state}
              handleGameStart={handleGameStart}
              handleRightClick={handleRightClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;
