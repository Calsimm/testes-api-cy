/// <reference types="cypress" />



     describe('Testes da Funcionalidade Usuários', () => {

          it('Deve validar contrato de usuários', () => {
               cy.request({
                    method: 'POST',
                    url: 'login',
                    body: {
                         "email": "Maria_qa@ebac.com.br",
                         "password": "teste"
                    }
               }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Login realizado com sucesso')
                    cy.log(response.body.authorization)
               })
          });

          it('Deve listar usuários cadastrados', () => {
               cy.request({
                    method: 'GET',
                    url: 'usuarios'
               }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body).to.have.property('usuarios')
               });
          });

          it('Deve cadastrar um usuário com sucesso', () => {
               cy.request({
                    method: 'POST',
                    url: 'usuarios',
                    body: {
                         "nome": 'Fulaninho 3',
                         "email": 'fulano3@teste.com',
                         "password": "teste",
                         "administrador": 'true'
                    }       

               }).then((response)=> {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal("Cadastro realizado com sucesso")
               });      
          });

          it('Deve validar um usuário com email inválido', () => {
               cy.request({
                    method: 'POST',
                    url: 'usuarios',
                    body: {
                         "email": "Maria@teste.com.br",
                         "password": "teste"
                    }
               }).then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.message).to.equal("Email e/ou senha inválidos")                    
               });
          });

          it('Deve editar um usuário previamente cadastrado', () => {            
               cy.request('usuarios').then(response => {               
                   let id = response.body.usuarios[2]._id       
                   cy.request({
                       method: 'PUT', 
                       url: `usuarios/${id}`,                       
                       body: {
                           "nome": 'Fulano 9',
                           "email": 'fulanin@teste.com',
                           "password": 'teste',
                           "administrador": 'true'
                         }
                   }).then(response => {
                       expect(response.body.message).to.equal('Registro alterado com sucesso')
                   })
               })
          });

          it.only('Deve deletar um usuário previamente cadastrado', () => {               
               cy.request('usuarios').then(response => {               
                    let id = response.body.usuarios[2]._id       
                    cy.request({                   
                       method: 'DELETE',
                       url: `usuarios/${id}`                       
                   }).then(response =>{
                       expect(response.body.message).to.equal('Registro excluído com sucesso')
                       expect(response.status).to.equal(200)
                   })
               })
          });
     });