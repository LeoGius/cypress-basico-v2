//Aula 7 - Exercício extra 2 - Desafio
it('testa a página de política de privacidade de forma independente', function(){
   cy.visit('./src/privacy.html') 

   cy.contains('Talking About Testing').should('be.visible')
})