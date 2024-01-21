import { SELECTORS } from "../../support/selectors";

describe("removing element from the queue", function () {
  it("should remove element from the queue, assign proper head and tail and render colors", function () {
    cy.visit("queue");
    cy.get('input[placeholder="Введите текст"]').as("queueInput");
    cy.get("button").contains("Добавить").closest("button").as("addButton");
    cy.get("button").contains("Удалить").closest("button").as("removeButton");
    cy.get('ul[class*="queue"] li:first')
      .find(SELECTORS.circleElement)
      .as("firstElement");
    // Adding element to the queue
    cy.get("@queueInput").type("1234");
    cy.get("@addButton").click();
    cy.get("@queueInput").type("4321");
    cy.get("@addButton").click();
    cy.get("@removeButton").click();
    cy.get("@firstElement")
      .invoke("attr", "class")
      .should("include", "circle_changing");
    cy.get("@firstElement")
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("");
      });
    cy.get("@firstElement")
      .invoke("attr", "class")
      .should("include", "circle_default");
    cy.get('ul[class*="queue"] li')
      .eq(1)
      .find('div[class*="circle_head"]')
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal("head");
      });
    cy.get('ul[class*="queue"] li')
      .eq(1)
      .find(SELECTORS.circleTail)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal("tail");
      });
  });
});
