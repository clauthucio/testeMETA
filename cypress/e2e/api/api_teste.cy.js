/// <reference types="Cypress"/>

describe('API - testeGETNET', () => {
    var usuario = '67823c6d-58de-494f-96d9-86a4c22682cb'
    var senha = 'c2d6a06f-5f31-448b-9079-7e170e8536e4'
    var autoriza = btoa(usuario+':'+senha)
    let passe = null

    it('Gerar Token de Acesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
            auth:{
                user: usuario,
                pass: senha
            },
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : autoriza
            },
            body: {
                scope: 'oob',
                grant_type: 'client_credentials'

            }
        })
        .then((response => {
            expect(response.status).to.eq(200)
            passe=response.body.access_token
        }))
    });

    it('Tokenização PCI', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/v1/tokens/card',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8',
                'Authorization' : 'Bearer '+passe
            },
            body: {
                card_number: '5155901222280001',
                customer_id: 'customer_21081826'

            }
        })
        .then((response => {
            expect(response.status).to.eq(201)
        }))
    })

});