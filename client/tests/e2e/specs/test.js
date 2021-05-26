// https://docs.cypress.io/api/introduction/api.html

describe('Test App Loads', () => {
	it('Visits the app root url', () => {
		cy.visit('/');
		cy.contains('h3', 'Paste your link :)');
	});
});
