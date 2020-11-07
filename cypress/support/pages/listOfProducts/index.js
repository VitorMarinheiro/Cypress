// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela

const elem = require('./elements').ELEMENTS;

class listOfProducts{

    validatePage(){
        cy.get(elem.pageTitle).should('be.visible')
    }

    sortingProducts(order){
        cy.get(elem.productSort).select(order)
    }

    selectItemWithIndex(position){
        cy.get(elem.productItem).eq(position).click()
    }

    resetApplicationState(){
        cy.get(elem.sideMenu).click()
        cy.get(elem.resetApp).click()
        cy.get(elem.closeMenu).click()
    }
}
export default new listOfProducts();