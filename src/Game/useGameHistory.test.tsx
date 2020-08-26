import { act, renderHook } from '@testing-library/react-hooks';
import { useGameHistory } from './useGameHistory';

const emptyBoard = [null, null, null, null, null, null, null, null, null];
const moveOneBoard = [null, 'X', null, null, null, null, null, null, null];
const moveTwoBoard = [null, 'X', null, null, null, null, null, null, 'O'];

describe('useGameHistory', () => {
  it('handleClick should change the board state', () => {
    const { result } = renderHook(() => useGameHistory());

    expect(result.current.squares).toEqual(emptyBoard);

    act(() => {
      result.current.handleClick(1);
    });

    expect(result.current.squares).toEqual(moveOneBoard);

    act(() => {
      result.current.handleClick(8);
    });

    expect(result.current.squares).toEqual(moveTwoBoard);
  });

  it('squares exist', () => {
    const { result } = renderHook(() => useGameHistory());

    expect(result.current.squares).toHaveLength(9);
  });

  it('jumpTo should revert game state', () => {
    const { result } = renderHook(() => useGameHistory());

    expect(result.current.squares).toEqual(emptyBoard);

    act(() => {
      result.current.handleClick(1);
    });

    expect(result.current.squares).toEqual(moveOneBoard);

    act(() => {
      result.current.jumpTo(0);
    });

    expect(result.current.squares).toEqual(emptyBoard);

    act(() => {
      result.current.jumpTo(1);
    });

    expect(result.current.squares).toEqual(moveOneBoard);
  });

  it('xIsNext should tell you who is next', () => {
    const { result } = renderHook(() => useGameHistory());
    expect(result.current.xIsNext).toBe(true);

    act(() => {
      result.current.handleClick(1);
    });

    expect(result.current.xIsNext).toBe(false);
  });

  it('totalMoves should count total game states', () => {
    const { result } = renderHook(() => useGameHistory());
    expect(result.current.totalMoves).toBe(1);

    act(() => {
      result.current.handleClick(1);
    });

    expect(result.current.totalMoves).toBe(2);

    act(() => {
      result.current.handleClick(2);
    });

    expect(result.current.totalMoves).toBe(3);
  });

  it('totalMoves should not increment for invalid move', () => {
    const { result } = renderHook(() => useGameHistory());
    expect(result.current.totalMoves).toBe(1);

    act(() => {
      result.current.handleClick(1);
    });

    expect(result.current.totalMoves).toBe(2);

    act(() => {
      result.current.handleClick(1);
    });

    expect(result.current.totalMoves).toBe(2);
  });
});
