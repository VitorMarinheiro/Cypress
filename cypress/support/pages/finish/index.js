// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela

const elem = require('./elements').ELEMENTS;

class finish{

    validateSucess(){
        cy.get(elem.subheader).should('have.text', 'Finish')
        cy.get(elem.completeHeader).should('have.text', 'THANK YOU FOR YOUR ORDER')
    }

}
export default new finish();
