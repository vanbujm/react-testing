import React from 'react';
import { Board } from '.';
import '../index.css';

export default {
  title: 'Board',
  component: Board,
};

const emptySquares = Array.from({ length: 9 }, () => null);

const filledSquares = Array.from({ length: 9 }, (_, i) => (i % 2 ? 'X' : 'O'));

export const Empty = () => <Board onClick={() => {}} squares={emptySquares} />;

export const Filled = () => <Board onClick={() => {}} squares={filledSquares} />;
