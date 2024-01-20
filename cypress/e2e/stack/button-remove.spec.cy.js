describe("button removes the last stack element", function () {
  it("should remove last stack element", function () {
    cy.visit("http://localhost:3000/stack");
    // Define aliases
    cy.get('input[placeholder="Введите текст"]').as("stackInput");
    cy.get("button").contains("Добавить").closest("button").as("addButton");
    cy.get("button").contains("Удалить").closest("button").as("remove");
    const stackContent = "ABC";

    // Add Elements to the Stack
    for (let i = 1; i <= 5; i++) {
      cy.get("@stackInput").type(stackContent + i);
      cy.get("@addButton").click();
    }
    cy.get("ul[class^='stack-page']").children("li").should("have.length", 5);
    // Clear the Stack
    cy.get("@remove").click();
    cy.get("ul[class^='stack-page']").children("li").should("have.length", 4);
    cy.get("ul[class^='stack-page']")
      .children("li")
      .last()
      .find('p[class*="circle_letter"]')
      .invoke("text")
      .should("not.contain", "ABC5");
  });
});
