// Classe responsavel por criar as funcoes de ação dentro da nossa pagina/tela
const elem = require('./elements').ELEMENTS;

class login{

    acessAndValidateLoginPage(){
        cy.visit('https://www.saucedemo.com/') 
        cy.get(elem.username).should('be.visible')
    }

    logIntoTheSystem(){
        cy.get(elem.username).type('standard_user')
        cy.get(elem.password).type('secret_sauce')
        cy.get(elem.loginButton).click()
    }
}
export default new login();