describe("cypress", () => {
  it("render data", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="cypress-title"]')
      .should("exist")
      .should("have.text", "SemBark.com");
  });

  it("render product", () => {
    cy.visit("http://localhost:5173/");
    cy.get(
      '[data-testid="product-Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"]'
    ).should("exist");
    cy.get('[data-testid="product-109.95"]').should("exist");
  });
});
