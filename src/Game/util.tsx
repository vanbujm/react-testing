import { SquareValue } from '../Square';

export const calculateWinner = (squares: SquareValue[]) => {
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
