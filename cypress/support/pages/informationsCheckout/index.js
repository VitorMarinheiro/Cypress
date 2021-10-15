// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela

const elem = require('./elements').ELEMENTS;

class informationsCheckout{

    validatePage(){
        cy.get(elem.title).should('have.text', 'Checkout: Your Information')
    }

    insertInformations(){
       cy.get(elem.firstName).type('Vitor').should('have.value', 'Vitor')
       cy.get(elem.lastName).type('Marinheiro').should('have.value', 'Marinheiro')
       cy.get(elem.postalCode).type('12345678').should('have.value', '12345678')
       cy.get(elem.continue).click()
    }
    
}
export default new informationsCheckout();