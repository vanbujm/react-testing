import React, { MouseEventHandler } from 'react';

export type SquareValue = 'X' | 'O' | null;

interface SquareProps {
  value: SquareValue;
  onClick: MouseEventHandler;
}

export const Square: React.FC<SquareProps> = ({ onClick, value }) => (
  <button className="square" onClick={onClick} data-testid="square">
    {value}
  </button>
);
