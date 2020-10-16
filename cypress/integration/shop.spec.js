/// <reference types="cypress" />

describe('MyStore', () => {
    it('Realizar Cadastro', () =>{

        // Acessa a URL do MyStore
        cy.visit('http://automationpractice.com')

        // Direciona para a pagina de cadastro
        cy.get('[class=login]').click()
        cy.get('[id=email_create]').type('medium20@cypress.com')

        // Cria um route para validar a API chamada
        cy.server()
        cy.route('POST', '/index.php').as('postEmail')

        // Clica no botão que realiza a chamada da API
        cy.get('#SubmitCreate > span').click()

        // Captura as informacoes da API no XHR e valida dados
        cy.wait('@postEmail').then((xhr => {
            expect(xhr.status).be.eq(200)
            expect(xhr.response.body).has.property('hasError', false)
        }))

        // Insere dados do cadastro
        cy.get('[id=id_gender1]').check().should('be.checked')   // Valida se o elemento esta selecionado
        cy.get('[id=customer_firstname]').type('Medium')
        cy.get('[id=customer_lastname]').type('Cypress')
        cy.get('[id=passwd]').type('CypressMedium123!')
        cy.get('[id=days]').select('16')
        cy.get('[id=months]').select('August')
        cy.get('[id=years]').select('1994').should('have.value', '1994')
        cy.get('[id=newsletter]').check()
        cy.get('[id=optin]').check()
        cy.get('[id=company]').type('Medium Blog')
        cy.get('[id=address1]').type('https://vitormarinheiroautomation.medium.com/').should('have.value', 'https://vitormarinheiroautomation.medium.com/')    // Valida se o elemento possui o texto que foi passado no type
        cy.get('[id=city]').type('Recife')
        cy.get('[id=id_country]').select('United States')
        cy.get('[id=id_state]').select('Florida')   
        cy.get('[id=postcode]').type('12345')
        cy.get('[id=phone_mobile]').type('81999999999')       
        
        // Finaliza o cadastro
        cy.get('[id=submitAccount]').click()

        // Valida apresentacao de Page Heading da conta criada
        cy.get('.page-heading').should('be.visible').should('have.text', 'My account')  // valida se elemento esta visivel e contem o texto 'My account'
    });

})