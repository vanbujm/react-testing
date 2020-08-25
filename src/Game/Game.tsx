import React from 'react';
import { useGameHistory } from './useGameHistory';
import { GameView } from './GameView';
import { calculateWinner } from './util';

export const Game = () => {
  const { handleClick, squares, jumpTo, xIsNext, totalMoves } = useGameHistory();

  const winner = calculateWinner(squares);

  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <GameView handleClick={handleClick} jumpTo={jumpTo} squares={squares} status={status} totalMoves={totalMoves} />
  );
};
