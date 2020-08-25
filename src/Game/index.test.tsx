import React from 'react';
import { render, getByTestId, fireEvent, getAllByRole, getByText } from '@testing-library/react';
import { Game } from './index';

describe('App', () => {
  it('renders 😎', () => {
    // Get me the game board
    const { container } = render(<Game />);

    // expect(getByTestClass(container, 'game')).toBeTruthy();
    // Nope, can't get by class.
    // Guess I'll add the test id: "game"

    expect(getByTestId(container, 'game')).toBeTruthy();
  });

  // So far so good...

  it('Places an "X" on the board when you click a square 🤔', async () => {
    // Uuuuh guess i better start with the game board again...
    const { container } = render(<Game />);

    // Get me a square?
    // const square = getByRole('button');
    // Shit, doesn't work got too many buttons
    // Guess I am adding more test Ids...
    // const square = getByTestId(container, 'square');
    // Wait... That doesn't work either there are multiple squares...
    const square = getAllByRole(container, 'button')[0];

    fireEvent.click(square);

    const x = getByText(container, 'X');

    expect(x.outerHTML).toMatchInlineSnapshot(`"<button class=\\"square\\" data-testid=\\"square\\">X</button>"`);
  });

  // Uuugh it took nearly an hour to figure out how to do that, I CBF doing any more tests for now.
});
