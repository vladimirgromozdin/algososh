import { SELECTORS } from "../../support/selectors";

describe("cleaning the queue", function () {
  it("should clean the queue and remove all elements", function () {
    cy.visit("queue");
    cy.get('input[placeholder="Введите текст"]').as("queueInput");
    cy.get("button").contains("Добавить").closest("button").as("addButton");
    cy.get("button").contains("Очистить").closest("button").as("cleanButton");
    // Adding element to the queue
    cy.get("@queueInput").type("1234");
    cy.get("@addButton").click();
    cy.get("@queueInput").type("4321");
    cy.get("@addButton").click();
    cy.get("@cleanButton").click();
    cy.get('ul[class*="queue"] li').each(($li) => {
      cy.wrap($li)
        .find(SELECTORS.circleTail)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).equal("");
        });
    });
  });
});
