import React, { useMemo } from 'react';
import { Square, SquareValue } from '../Square';

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
}

export const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  // const renderSquare = (i: number) => {
  //   return <Square value={squares[i]} onClick={() => onClick(i)} />;
  // };
  // Memoize this so that we dont generate it on every render
  const renderSquare = useMemo<JSX.Element[]>(
    () => Array.from({ length: 9 }, (_, i) => <Square value={squares[i]} onClick={() => onClick(i)} />),
    [onClick, squares],
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare[0]}
        {renderSquare[1]}
        {renderSquare[2]}
      </div>
      <div className="board-row">
        {renderSquare[3]}
        {renderSquare[4]}
        {renderSquare[5]}
      </div>
      <div className="board-row">
        {renderSquare[6]}
        {renderSquare[7]}
        {renderSquare[8]}
      </div>
    </div>
  );
};
