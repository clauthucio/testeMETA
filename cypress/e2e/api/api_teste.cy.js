/// <reference types="Cypress"/>
import {usuario} from "../pojo/usuario";

var uri = 'https://api-homologacao.getnet.com.br/'
var uriToken = uri+'auth/oauth/v2/token'
var uriTokenizacaoPCI = uri+'v1/tokens/card'
const meuUsuario = new usuario('67823c6d-58de-494f-96d9-86a4c22682cb', 'c2d6a06f-5f31-448b-9079-7e170e8536e4')
var autoriza = btoa(meuUsuario.nomeUsuario+':'+meuUsuario.senhaUsuario)
var passe = null

describe('API - testeGETNET', () => {

    it('Status 200- Gerar Token de Acesso', () => {
        cy.request({
            method: 'POST',
            url: uriToken,
            auth:{
                user: meuUsuario.nomeUsuario,
                pass: meuUsuario.senhaUsuario
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
    it('Status 400- Gerar Token de Acesso', () => {
        cy.request({
            method: 'POST',
            url: uriToken,
            auth:{
                user: meuUsuario.nomeUsuario,
                pass: meuUsuario.senhaUsuario
            },
            headers: {
                'Content-Type' : 'application/json; charset=utf-8',
                'Authorization' : autoriza
            },
            body: {
                scope: 'oob',
                grant_type: 'client_credentials'

            },
            failOnStatusCode: false
        })
        .then((response => {
            expect(response.status).to.eq(400)
        }))
    });
    it('Status 401- Gerar Token de Acesso', () => {
        cy.request({
            method: 'POST',
            url: uriToken,
            auth:{
                user: meuUsuario.nomeUsuario,
                pass: 'Sem autorização'
            },
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : autoriza
            },
            body: {
                scope: 'oob',
                grant_type: 'client_credentials'

            },
            failOnStatusCode: false
        })
        .then((response => {
            expect(response.status).to.eq(401)
        }))
    });

    it('Tokenização PCI', () => {
        cy.request({
            method: 'POST',
            url: uriTokenizacaoPCI,
            headers: {
                'Content-Type' : 'application/json; charset=utf-8',
                'Authorization' : 'Bearer '+ passe
            },
            body: {
                card_number: '5155901222280001',
                customer_id: 'customer_21081826'

            }
        })
        .then((response => {
            expect(response.status).to.eq(201)
            expect(response.body.number_token).to.not.equal(null)
        }))
    })

});