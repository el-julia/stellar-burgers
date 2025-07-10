import { rootReducer } from './store';

describe('Тесты для конфигурации rootReducer', () => {
  it('должен возвращать начальное состояние для неизвестного экшена', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('profile');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('login');
    expect(state).toHaveProperty('register');
  });
});
