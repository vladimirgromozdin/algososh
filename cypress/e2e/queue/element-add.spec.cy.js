describe("adding element to the queue", function () {
  it("should add element to the queue, assign proper head and tail and render colors", function () {
    cy.visit("http://localhost:3000/queue");
    cy.get('input[placeholder="Введите текст"]').as("queueInput");
    cy.get("button").contains("Добавить").closest("button").as("addButton");
    cy.get('ul[class*="queue"] li:first')
      .find('div[class*="circle_circle"]')
      .as("firstElement");
    // Adding element to the queue
    cy.get("@queueInput").type("1234");
    cy.get("@addButton").click();
    cy.get("@firstElement")
      .invoke("attr", "class")
      .should("include", "circle_changing");
    cy.get('ul[class*="queue"] li:first')
      .find('div[class*="circle_head"]')
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal("head");
      });
    cy.get('ul[class*="queue"] li:first')
      .find('div[class*="circle_tail"]')
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal("tail");
      });
    cy.get("@firstElement")
      .invoke("attr", "class")
      .should("include", "circle_default");
  });
});
