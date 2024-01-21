describe("button is disabled when input is empty", function () {
  it("should disable the add button when input is empty", function () {
    cy.visit("http://localhost:3000/recursion");
    cy.get('ul[class*="stack"] li:first')
      .find('div[class*="circle_circle"]')
      .as("firstElement");
    cy.get('input[placeholder="Введите текст"]').clear();
    cy.get("button")
      .contains("Развернуть")
      .closest("button")
      .should("be.disabled");
  });
});
