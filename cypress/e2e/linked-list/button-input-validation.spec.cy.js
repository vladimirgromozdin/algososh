describe("button is disabled when input is empty", function () {
  it("should disable the add button when input is empty", function () {
    cy.visit("list");
    cy.get('input[placeholder="Введите текст"]').clear();
    cy.get("button")
      .contains("Добавить в head")
      .closest("button")
      .should("be.disabled");
    cy.get("button")
      .contains("Добавить в tail")
      .closest("button")
      .should("be.disabled");
    cy.get('input[placeholder="Введите индекс"]').clear();
    cy.get("button")
      .contains("Добавить по индексу")
      .closest("button")
      .should("be.disabled");
    cy.get("button")
      .contains("Удалить по индексу")
      .closest("button")
      .should("be.disabled");
  });
});
