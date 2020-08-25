import React, { useCallback, useMemo, useState } from 'react';
import './app.css';
import { SquareValue } from './Square';
import { Board } from './Board';

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

export const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
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

  const moves = useMemo(
    () =>
      history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      }),
    [history, jumpTo],
  );

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

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
