/// <reference types="cypress" />

describe('MyStore', () => {

    beforeEach(() => {
        // Acessa a URL do MyStore
        cy.visit('http://automationpractice.com')
      })

    it('Realizar Cadastro', () =>{
        
        // Salva o usuario e senha utilizados nas variaveis do Cypress
        // Gera email com um numero randomico para evitar erro de emai repetido
        Cypress.env('userEmail', 'medium'+Math.floor(Math.random() * 1000)+'@cypress.com')
        Cypress.env('userPwd', 'CypressMedium123')

        // Direciona para a pagina de cadastro
        cy.get('[class=login]').click()
        cy.get('[id=email_create]').type(Cypress.env('userEmail'))

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
        cy.get('[id=passwd]').type(Cypress.env('userPwd'))
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

    it('Logar no sistema', () =>{

        // Direciona para a pagina de cadastro
        cy.get('[class=login]').click()
    
        // Insere as informacoes salvas nas variaveis do Cypress
        cy.get('[id=email]').type(Cypress.env('userEmail'))
        cy.get('[id=passwd]').type(Cypress.env('userPwd'))
        cy.get('#SubmitLogin > span').click()

        // Valida apresentacao do elemento de sucesso
        cy.get('.page-heading').should('be.visible').should('have.text', 'My account')  // valida se elemento esta visivel e contem o texto 'My account'

    });

    it('Realizar uma compra', () =>{

        // Busca por 'Dress' no campo de busca
        cy.get('[id=search_query_top').type('dress')
        cy.get('#searchbox > .btn').click()

        // Ordena produtos por maior preço e adiciona ao carrinho o primeiro vestido
        cy.get('#selectProductSort').select('Price: Highest first')
        
        // Captura o valor unitario do produto para posterior validacao desse valor na chamada da API de adicionar ao carrinho
        cy.get(':nth-child(1) > .product-container > .right-block > .content_price > .price').invoke('text').then(($preco) => {
          
            // Cria um route para validar a API chamada
            cy.server()
            cy.route('POST', '/index.*').as('newDress')

            // Insere ao carrinho
            cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()

            // Captura as informacoes da API no XHR e valida dados
            cy.wait('@newDress').then((xhr => {
                expect(xhr.status).be.eq(200)
                expect(xhr.response.body).has.property('hasError', false)
                expect(xhr.response.body).has.property('nbTotalProducts', 1)
                expect(xhr.response.body).has.property('productTotal', $preco.trim())
            }))

        })

        // Incrementa 1 unidade no produto 
        cy.get('.button-container > .button-medium > span').click()
        cy.get('#cart_quantity_up_4_16_0_0 > span').click()
        cy.get('.cart_quantity_input').should('have.value', 2)

        // Valida se o valor multiplicado por 2x corresponde ao total
        cy.get('#product_price_4_16_0 > .price').invoke('text').then(($valor) => {
            cy.get('[id=total_product_price_4_16_0]').invoke('text').should(($total) => {
              expect(parseFloat($valor.replace('$', ''))*2).eq(parseFloat($total.replace('$', '')))
            })
        })

        // Finaliza a selecao do produto
        cy.get('.cart_navigation > .button > span').click()

        // Insere as informacoes salvas nas variaveis do Cypress para o login
        cy.get('[id=email]').type(Cypress.env('userEmail'))
        cy.get('[id=passwd]').type(Cypress.env('userPwd'))
        cy.get('#SubmitLogin > span').click()

        // Finaliza o endereco
        cy.get('#ordermsg > .form-control').type('Comprando dois vestidos.')
        cy.get('.cart_navigation > .button > span').click()

        // Altera o Shipping
        cy.get('#cgv').check()
        cy.get('.cart_navigation > .button > span').click()

        // Seleciona metodo de pagamento
        cy.get('.bankwire').click()
        cy.get('#cart_navigation > .button > span').click()

        // Validar ordem finalizada
        cy.get('.cheque-indent > .dark').should('be.visible')

    })

})