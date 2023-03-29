Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Giusti')
    cy.get('#email').type('leogius2003@yahoo.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})