import React from 'react';

import './header.css';

interface HeaderProps {
  face: string;
  timer: number;
  handleResetGame(): void;
}

const Header: React.FC<HeaderProps> = ({ face, timer, handleResetGame }) => (
  <div className='header'>
    <h1>Minesweeper Game in React</h1>
    <div className='status_container'>
      <div className='bombs'>
        <span role='img' aria-label='emoji'>
          💣
        </span>
        10/10
      </div>
      <div className='emoji'>
        <span role='button' tabIndex={0} aria-label='emoji' onClick={handleResetGame} onKeyDown={handleResetGame}>
          {face}
        </span>
      </div>
      <div className='timer'>
        <span role='img' aria-label='emoji'>
          🕙 {timer.toString().padStart(3, '0')}
        </span>
      </div>
    </div>
  </div>
);

export default Header;
