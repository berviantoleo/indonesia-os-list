// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("http://localhost:8080/indonesia-os-list/");
    cy.contains("h1", "Indonesia Operating System List");
  });
});
