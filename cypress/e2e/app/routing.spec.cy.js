describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("/");
  });
  it("navigates to the string page", function () {
    cy.get("div[class*='string']").click();
    cy.url().should("include", "recursion");
    cy.contains("Строка");
  });
  it("navigates to the fibonacci page", function () {
    cy.get("div[class*='fibonacci']").click();
    cy.url().should("include", "fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });
  it("navigates to the array sorting page", function () {
    cy.get("div[class*='arr']").click();
    cy.url().should("include", "sorting");
    cy.contains("Сортировка массива");
  });
  it("navigates to the stack page", function () {
    cy.get("div[class*='stack']").click();
    cy.url().should("include", "stack");
    cy.contains("Стек");
  });
  it("navigates to the queue page", function () {
    cy.get("div[class*='queue']").click();
    cy.url().should("include", "queue");
    cy.contains("Очередь");
  });
  it("navigates to the linked list page", function () {
    cy.get("div[class*='list']").click();
    cy.url().should("include", "list");
    cy.contains("Связный список");
  });
});
