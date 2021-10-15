// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela

const elem = require('./elements').ELEMENTS;

class finish{

    validateSucess(){
        cy.get(elem.completeText).should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        cy.get(elem.completeHeader).should('have.text', 'THANK YOU FOR YOUR ORDER')
    }

}
export default new finish();
