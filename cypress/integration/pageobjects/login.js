class login{

    username(){
        return cy.get('[id=user-name]')
    }
    password(){
        return cy.get('[id=password]')
    }

    loginButton(){
        return cy.get('[id=login-button]')
    }
}
export default login