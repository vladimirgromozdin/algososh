import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("elements add to the stack properly", function () {
  it("should add elements to the stack and update border colors", function () {
    cy.visit("http://localhost:3000/stack");
    // Define aliases
    cy.get('input[placeholder="Введите текст"]').as("stackInput");
    cy.get("button").contains("Добавить").closest("button").as("addButton");
    const stackContent = "ABC";

    // Add Elements to the Stack
    cy.get("@stackInput").type(stackContent);
    cy.get("@addButton").click();
    cy.get('li [class*="circle_changing"]').should("exist");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('li [class*="circle_default"]').should("exist");
    cy.get("@stackInput").type(stackContent);
    cy.get("@addButton").click();
    cy.get("@stackInput").type(stackContent);
    cy.get("@addButton").click();
    cy.get("@stackInput").type(stackContent);
    cy.get("@addButton").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('ul[class*="stack-page_stack"] li').each((li) => {
      cy.wrap(li).find('div[class*="circle_default"]').should("exist");
    });
  });
});
