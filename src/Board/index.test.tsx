import { fireEvent, getAllByRole, render } from '@testing-library/react';
import React from 'react';
import { Board } from './index';

// @ts-ignore
jest.mock('../Square', () => ({
  Square: ({ onClick, value }: any) => <button onClick={onClick}>{value}</button>,
}));

const emptySquares = Array.from({ length: 9 }, () => null);

describe('Board', () => {
  it('Handles Clicks', () => {
    const clickHandler = jest.fn();

    const { container } = render(<Board onClick={clickHandler} squares={emptySquares} />);

    const square = getAllByRole(container, 'button')[0];

    fireEvent.click(square);

    expect(clickHandler).toHaveBeenCalledTimes(1);

    expect(clickHandler.mock.calls[0][0]).toEqual(0);
  });
});
