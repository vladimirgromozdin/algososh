describe("Fibonacci sequence validation", function () {
  it("should validate the Fibonacci sequence", function () {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get('input[placeholder="Введите текст"]').as("fiboInput");
    cy.get("button").contains("Рассчитать").closest("button").as("calcButton");

    // Function to calculate the Fibonacci number
    const fibonacci = (n) => {
      if (n <= 1) return 1;
      let a = 1,
        b = 1,
        f = 1;
      for (let i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
      }
      return f;
    };

    cy.get("@fiboInput").type(19);
    cy.get("@calcButton").click();
    cy.get("@calcButton", { timeout: 10000 }).should("not.be.disabled");
    cy.get('ul[class*="fibonacci-page_list"] > li').each(($li, index) => {
      const expectedFibNumber = fibonacci(index).toString();
      cy.wrap($li)
        .find('p[class*="text_type_circle"]')
        .invoke("text")
        .should("eq", expectedFibNumber);
    });
  });
});
