describe("button is disabled when input is empty", function () {
  it("should disable the add button when input is empty", function () {
    cy.visit("recursion");
    cy.get('input[placeholder="Введите текст"]').clear();
    cy.get("button")
      .contains("Развернуть")
      .closest("button")
      .should("be.disabled");
  });
});
