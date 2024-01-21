describe("cleaning the queue", function () {
  it("should clean the quene and remove all eleemnts", function () {
    cy.visit("http://localhost:3000/queue");
    cy.get('input[placeholder="Введите текст"]').as("queueInput");
    cy.get("button").contains("Добавить").closest("button").as("addButton");
    cy.get("button").contains("Очистить").closest("button").as("cleanButton");
    cy.get('ul[class*="queue"] li:first')
      .find('div[class*="circle_circle"]')
      .as("firstElement");
    // Adding element to the queue
    cy.get("@queueInput").type("1234");
    cy.get("@addButton").click();
    cy.get("@queueInput").type("4321");
    cy.get("@addButton").click();
    cy.get("@cleanButton").click();
    cy.get('ul[class*="queue"] li').each(($li) => {
      cy.wrap($li)
        .find('div[class*="circle_tail"]')
        .invoke("text")
        .then((text) => {
          expect(text.trim()).equal("");
        });
    });
  });
});
