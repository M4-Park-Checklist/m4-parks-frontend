describe('PokéLex App', () => {
  beforeEach(() => {
    cy.viewport(1600, 1000)
    cy.intercept('GET', "https://developer.nps.gov/api/v1/parks?api_key=jR5uonh1B6R19iLhdweq7nHBs0uGgKgwzqn3BNfb&limit=500", {
      fixture: 'parks.json'
    })
    .as("getParks")
  })
  context('Empty Team Testing', () => {
    it('Should show you a message if your team is empty', () => {
      cy.visit('http://localhost:3000/');
      cy.wait("@getParks")

      cy.title().should('eq', 'NPS Service');
      cy.get('.checkbox').should('have.length', 2);

      // cy.get('a').contains('Teams').click();
      // cy.url().should('eq', 'http://localhost:3000/teams');
      // cy.contains('Pick a generation and add some pokemon to your team!').should('exist');
      // cy.contains('Your team so far...').should('exist');
    });
  });
})