// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela

const elem = require('./elements').ELEMENTS;

class checkoutOverview{

    validatePage(){
        cy.get(elem.subHeader).should('have.text', 'Checkout: Overview')
    }

    validateInformations(){
        cy.get(elem.quantity).should('have.text', '1')
        cy.get(elem.price).should('have.text', Cypress.env('price'))
    }
    
    finishRequest(){
        cy.get(elem.finish).click()
    }
    
}
export default new checkoutOverview();
