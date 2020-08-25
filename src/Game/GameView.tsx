import React, { useMemo } from 'react';
import { Board } from '../Board';
import { SquareValue } from '../Square';

interface GameViewProps {
  status: string;
  handleClick: (i: number) => void;
  jumpTo: (step: number) => void;
  totalMoves: number;
  squares: SquareValue[];
}

export const GameView: React.FC<GameViewProps> = ({ handleClick, jumpTo, status, totalMoves, squares }) => {
  const moves = useMemo(
    () =>
      Array.from({ length: totalMoves }, (_, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      }),
    [jumpTo, totalMoves],
  );

  return (
    <div className="game" data-testid="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
