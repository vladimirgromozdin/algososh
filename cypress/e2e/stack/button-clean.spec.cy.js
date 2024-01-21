describe("clean button removes all stack elements", function () {
  it("should remove stack elements when clicked", function () {
    cy.visit("stack");
    // Define aliases
    cy.get('input[placeholder="Введите текст"]').as("stackInput");
    cy.get("button").contains("Добавить").closest("button").as("addButton");
    cy.get("button").contains("Очистить").closest("button").as("clearButton");
    const stackContent = "ABC";

    // Add Elements to the Stack
    cy.get("@stackInput").type(stackContent);
    cy.get("@addButton").click();
    cy.get("@stackInput").type(stackContent);
    cy.get("@addButton").click();

    // Clear the Stack
    cy.get("@clearButton").click();
    cy.get("ul[class^='stack-page']").children("li").should("have.length", 0);
  });
});
