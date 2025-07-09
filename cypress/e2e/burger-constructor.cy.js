describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('Должна загрузить ингредиенты и показать булки и соусы', () => {
    cy.get('[data-cy="ingredient-item"]').should('have.length.at.least', 1);
    cy.contains('Краторная булка N-200i').should('exist');
  });

  it('Добавляет ингредиент при клике по кнопке «Добавить»', () => {
    //клик по кнопке Добавить
    cy.get("[data-cy='ingredient-item'] button").first().click();
    cy.get("[data-cy='ingredient-item'] button").last().click();

    //ингредиент появился
    cy.get('[data-cy="ingredient-burger"]').should('have.length', 1);
  });

  // тест модального окна
  it('Открывает модальное окно ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="ingredient-modal"]').should('exist');
  });

  it('Закрывает модальное окно по крестику', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="ingredient-modal"]').should('exist');

    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });

  it('Закрывает модальное окно по клику на оверлей', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="ingredient-modal"]').should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });
});
