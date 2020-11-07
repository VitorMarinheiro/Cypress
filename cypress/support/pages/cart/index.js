// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela

const elem = require('./elements').ELEMENTS;

class cart{

    validateRemovedItem(){
        cy.get(elem.removeButton).click().should('not.exist');
    }

    selectLastItem(){
        cy.get(elem.item).last().click()
    }

    validateNumberOfItems(qt){
        cy.get(elem.quantity).should('have.text', qt)
    }

    validatePrice(){
        let price = Cypress.env('price')
        price = price.replace("$", "");
        cy.get(elem.price).contains(price)
    }

    continueRequest(){
        cy.get(elem.checkout).click()
    }
    
}
export default new cart();
