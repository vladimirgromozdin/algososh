import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("linked-list elements interactions", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
    cy.get('input[placeholder="Введите текст"]').as("textInput");
    cy.get('input[placeholder="Введите индекс"]').as("indexInput");
    cy.get("button")
      .contains("Добавить в head")
      .closest("button")
      .as("addToHeadButton");
    cy.get("button")
      .contains("Добавить в tail")
      .closest("button")
      .as("addToTailButton");
    cy.get("button")
      .contains("Удалить из head")
      .closest("button")
      .as("removeFromHeadButton");
    cy.get("button")
      .contains("Удалить из tail")
      .closest("button")
      .as("removeFromTailButton");
    cy.get("button")
      .contains("Добавить по индексу")
      .closest("button")
      .as("addByIndex");
    cy.get("button")
      .contains("Удалить по индексу")
      .closest("button")
      .as("removeByIndex");
  });
  it("should render default list", () => {
    cy.get('ul[class*="list-page"]').children("li").should("have.length", 5);
  });
  it("should add element to head", () => {
    cy.get("@textInput").type("A1B2");
    cy.get("@addToHeadButton").click();
    cy.wait(DELAY_IN_MS);
    cy.get('ul[class*="list-page"] li:first')
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("A1B2");
      });
  });
  it("should add element to tail", () => {
    cy.get("@textInput").type("A1B2");
    cy.get("@addToTailButton").click();
    cy.wait(DELAY_IN_MS);
    cy.get('ul[class*="list-page"] li:last')
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("A1B2");
      });
  });
  it("should add element by index", () => {
    cy.get("@textInput").type("INDE");
    cy.get("@indexInput").type(0);
    cy.get("@addByIndex").click();
    cy.wait(DELAY_IN_MS);
    cy.get('ul[class*="list-page"] li:first')
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("INDE");
      });
  });
  it("should remove element from head", () => {
    cy.get("@removeFromHeadButton").click();
    cy.wait(DELAY_IN_MS);
    cy.get('ul[class*="list-page"] li:first')
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("34");
      });
  });
  it("should remove element from tail", () => {
    cy.get("@removeFromTailButton").click();
    cy.wait(DELAY_IN_MS);
    cy.get('ul[class*="list-page"] li:last')
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("1");
      });
  });
  it("should remove element by index", () => {
    cy.get("@indexInput").type(4);
    cy.get("@removeByIndex").click();
    cy.wait(DELAY_IN_MS * 5);
    cy.get('ul[class*="list-page"] li:last')
      .find("p.text_type_circle")
      .invoke("text")
      .then((text) => {
        expect(text).equal("1");
      });
  });
});
