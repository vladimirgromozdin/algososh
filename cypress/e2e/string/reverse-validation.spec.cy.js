import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { SELECTORS } from "../../support/selectors";

describe("strings are reversed properly", function () {
  it("should reverse the string and apply styling on every step", function () {
    cy.visit("recursion");
    cy.get('input[placeholder="Введите текст"]').as("stringInput");
    cy.get("button")
      .contains("Развернуть")
      .closest("button")
      .as("reverseButton");
    cy.get("@stringInput").type("12345");
    cy.get("@reverseButton").click();
    cy.get("ul[class^='string']").children("li").should("have.length", 5);
    cy.get('ul[class*="string"] li:first')
      .find(SELECTORS.circleElement)
      .as("firstElement");
    cy.get('ul[class*="string"] li')
      .eq(1)
      .find(SELECTORS.circleElement)
      .as("secondElement");
    cy.get('ul[class*="string"] li')
      .eq(2)
      .find(SELECTORS.circleElement)
      .as("thirdElement");
    cy.get('ul[class*="string"] li')
      .eq(3)
      .find(SELECTORS.circleElement)
      .as("forthElement");
    cy.get('ul[class*="string"] li:last')
      .find(SELECTORS.circleElement)
      .as("lastElement");

    // Step 1 [1,2,3,4,5]
    cy.get("@firstElement")
      .invoke("attr", "class")
      .should("include", "circle_changing");
    cy.get("@secondElement")
      .invoke("attr", "class")
      .should("include", "circle_default");
    cy.get("@thirdElement")
      .invoke("attr", "class")
      .should("include", "circle_default");
    cy.get("@forthElement")
      .invoke("attr", "class")
      .should("include", "circle_default");
    cy.get("@lastElement")
      .invoke("attr", "class")
      .should("include", "circle_changing");
    cy.wait(SHORT_DELAY_IN_MS);

    // Step 2 [5,2,3,4,1]
    cy.get("@firstElement")
      .invoke("attr", "class")
      .should("include", "circle_modified");
    cy.get("@firstElement")
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        // Perform your assertions here
        expect(text).equal("5");
      });
    cy.get("@secondElement")
      .invoke("attr", "class")
      .should("include", "circle_changing");
    cy.get("@thirdElement")
      .invoke("attr", "class")
      .should("include", "circle_default");
    cy.get("@forthElement")
      .invoke("attr", "class")
      .should("include", "circle_changing");
    cy.get("@lastElement")
      .invoke("attr", "class")
      .should("include", "circle_modified");
    cy.get("@lastElement")
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("1");
      });
    cy.wait(SHORT_DELAY_IN_MS);

    // Step 3 [5,4,3,2,1]
    cy.get("@firstElement")
      .invoke("attr", "class")
      .should("include", "circle_modified");
    cy.get("@firstElement")
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("5");
      });
    cy.get("@secondElement")
      .invoke("attr", "class")
      .should("include", "circle_modified");
    cy.get("@secondElement")
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("4");
      });
    cy.get("@thirdElement")
      .invoke("attr", "class")
      .should("include", "circle_changing");
    cy.get("@forthElement")
      .invoke("attr", "class")
      .should("include", "circle_modified");
    cy.get("@forthElement")
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("2");
      });
    cy.get("@lastElement")
      .invoke("attr", "class")
      .should("include", "circle_modified");
    cy.get("@lastElement")
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("1");
      });
    cy.wait(SHORT_DELAY_IN_MS);

    // Last step
    cy.get("ul[class^='string']")
      .children("li")
      .each(($li) => {
        cy.wrap($li)
          .find(SELECTORS.circleElement)
          .invoke("attr", "class")
          .should("include", "circle_modified");
      });
  });
});
