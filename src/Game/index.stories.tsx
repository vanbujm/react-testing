import React from 'react';
import '../index.css';
import { GameView as Game } from '.';

export default {
  title: 'Game',
  component: Game,
};

const emptySquares = Array.from({ length: 9 }, () => null);

const filledSquares = Array.from({ length: 9 }, (_, i) => (i % 2 ? 'X' : 'O'));

export const Initial = () => (
  <Game handleClick={() => {}} jumpTo={() => {}} status={'Next Player: X'} squares={emptySquares} totalMoves={1} />
);

export const Filled = () => (
  <Game handleClick={() => {}} jumpTo={() => {}} status={'Winner: X'} squares={filledSquares} totalMoves={9} />
);
