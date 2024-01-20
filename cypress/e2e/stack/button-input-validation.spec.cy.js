describe("button is disabled when input is empty", function () {
  it("should disable the add button when input is empty", function () {
    cy.visit("http://localhost:3000/stack");
    cy.get('input[placeholder="Введите текст"]').clear();
    cy.get("button")
      .contains("Добавить")
      .closest("button")
      .should("be.disabled");
  });
});
