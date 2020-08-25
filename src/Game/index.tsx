import React, { useCallback, useMemo, useState } from 'react';
import { SquareValue } from '../Square';
import { Board } from '../Board';

const calculateWinner = (squares: SquareValue[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return lines.reduce<null | SquareValue>((acc, val) => {
    const [a, b, c] = val;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    return acc;
  }, null);
};

type GameHistory = { squares: SquareValue[] }[];

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

export const Game = () => {
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
  const winner = calculateWinner(squares);

  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <GameView handleClick={handleClick} jumpTo={jumpTo} squares={squares} status={status} totalMoves={history.length} />
  );
};
