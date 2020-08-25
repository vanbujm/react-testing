import { useCallback, useState } from 'react';
import { SquareValue } from '../Square';
import { calculateWinner } from './util';

type GameHistory = { squares: SquareValue[] }[];

export const useGameHistory = () => {
  const [history, setHistory] = useState<GameHistory>([
    {
      squares: Array.from({ length: 9 }, () => null as SquareValue),
    },
  ]);

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  // Use useCallback so you don't constantly recreate the handler
  const handleClick = useCallback(
    (i: number) => {
      const tempHistory = history.slice(0, stepNumber + 1);
      const current = tempHistory[tempHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? 'X' : 'O';

      setHistory(
        tempHistory.concat([
          {
            squares: squares,
          },
        ]),
      );

      setStepNumber(tempHistory.length);

      setXIsNext(!xIsNext);
    },
    [history, stepNumber, xIsNext],
  );

  const jumpTo = useCallback((step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }, []);

  const { squares } = history[stepNumber];

  return { handleClick, squares, jumpTo, xIsNext, totalMoves: history.length };
};
