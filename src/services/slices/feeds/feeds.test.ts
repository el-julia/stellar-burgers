import { expect, test, describe } from '@jest/globals';
import feedSlice, { fetchFeed, initialState } from './feed';

describe('feedSlice reducer', () => {

  test('должен обработать fetchFeed.pending', () => {
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('должен обработать fetchFeed.fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: [],
      total: 10,
      totalToday: 2
    };
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.fulfilled(mockResponse, '', undefined)
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.orders).toEqual(mockResponse.orders);
    expect(nextState.total).toBe(10);
    expect(nextState.totalToday).toBe(2);
    expect(nextState.error).toBeNull();
  });

  test('должен обработать fetchFeed.rejected', () => {
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.rejected(null, '', undefined, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки ленты заказов');
  });
});
