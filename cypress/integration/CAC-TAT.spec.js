/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })


    //Aula 2 - exercício extra 1
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, testes, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Giusti')
        cy.get('#email').type('leogius2003@yahoo.com.br')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success').should('be.visible')
    })

    //Aula 2 - Exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Giusti')
        cy.get('#email').type('leogius2003@yahoo,com.br')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    //Aula 2 - Exercício extra 3
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Giusti')
        cy.get('#email').type('leogius2003@yahoo.com.br')
        cy.get('#phone').type('abcdefg').should('have.value', '')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
    })

    //Aula 2 - Exercício extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido anstes do envio do formulario', function(){
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Giusti')
        cy.get('#email').type('leogius2003@yahoo.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    //Aula 2 - Exercício extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo').clear().should('have.value', '')
        cy.get('#lastName').type('Giusti').should('have.value', 'Giusti').clear().should('have.value', '')
        cy.get('#email').type('leogius2003@yahoo.com.br').should('have.value', 'leogius2003@yahoo.com.br').clear().should('have.value', '')
        cy.get('#phone').type('16991652323').should('have.value', '16991652323').clear().should('have.value', '')
    })

    //Aula 2 - Exercício extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //Aula 2 - Exercício extra 7
    it('envia um formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //Aula 3 - Exercício
    it('seleciona um produto (YouTUbe) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    //Aula 3 - Exercício extra 1
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    //Aula 3 - Exercício extra 2
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //Aula 4 - Exercício
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    //Aula 4 = Exercício extra
    it('marca cada tipo de aterndimento', function(){
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //Aula 5 - Exercício
    it('marca ambos checkboxes, depois demarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    //Aula 5 - Exercício extra
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido anstes do envio do formulario', function(){
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Giusti')
        cy.get('#email').type('leogius2003@yahoo.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    //Aula 6 - Exercício
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json').should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //Aula 6 - Exercício extra 1
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    
    //Aula 6 - Exercício extra 2
    it('seleciona um arquivo utilizando uma fixture oara o qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //Aula 7 - Exercício
    it('verifica qua a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')            
    })

    //Aula 7 - Exercício extra 1
    it('acessa a página da política de privacidade removendo o targete então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    

})
