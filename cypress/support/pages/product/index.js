// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela

const elem = require('./elements').ELEMENTS;

class product{

    addProductToCart(){
        cy.get(elem.addToCart).click()
        cy.get(elem.price).invoke('text').should((price) => {
            Cypress.env('price', price)
        })
    }

    openCart(){
        cy.get(elem.openCart).click()
    }
    
}
export default new product();
