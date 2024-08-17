/// <reference types="cypress"/>

// describe('should Register Successfully', () =>
// {
//   it('if send request correctly', ()=> {
//     cy.request({
//       url: `/users`,
//       method: 'POST',
//       body: {
//         name: 'newUser',
//         email: 'newUser@mail.com',
//         password: 'password123',
//         password_confirmation: 'password123',
//       },
//     }).then((response) => {
//       expect(response.status).to.eq(201);
//       expect(response.body).to.have.property('message', 'User created, check yor email to confirmation');
//     });
//   })
// })

describe('should Register Unsuccessfully', () =>
{
  it('should Register User exist', ()=> {
    cy.api({
      url: `/users`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name: 'rio',
        email: Cypress.env('email'),
        password: Cypress.env('password'),
        password_confirmation: Cypress.env('password'),
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property('errors').to.deep.eq([
        'Email has already been taken',
      ])
    });
  })

  it('should Register different password', ()=> {
    cy.api({
      url: `/users`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name: "testes",
        email: "email@mail.com",
        password: Cypress.env('password'),
        password_confirmation: 'password123123',
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property('errors').to.deep.eq([
        "Password confirmation doesn't match Password",
      ])
    });
  })

  it('should Register password and password_confirmation minimum is 8 characters', ()=> {
    cy.api({
      url: `/users`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name: "testes",
        email: "email@mail.com",
        password: 'pass',
        password_confirmation: 'pass',
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property('errors').to.deep.eq([
        "Password is too short (minimum is 8 characters)",
        // "Password confirmation is too short (minimum is 8 characters)"
      ])
    });
  })
  it('should Register password and password_confirmation is not fill', ()=> {
    cy.api({
      url: `/users`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name: "testes",
        email: "email@mail.com",
        password: '',
        password_confirmation: '',
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property('errors').to.deep.eq([
        "Password can't be blank",
        "Password is too short (minimum is 8 characters)",
        // "Password confirmation is too short (minimum is 8 characters)",
        // "Password confirmation can't be blank"
      ])
    });
  })

  it('should Register Name is not fill', ()=> {
    cy.api({
      url: `/users`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name: "",
        email: "email@mail.com",
        password: Cypress.env('password'),
        password_confirmation: Cypress.env('password'),
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property('errors').to.deep.eq([
        "Name can't be blank",
      ])
    });
  })
  it('should Register email is not fill', ()=> {
    cy.api({
      url: `/users`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name: "testes",
        email: "",
        password: Cypress.env('password'),
        password_confirmation: Cypress.env('password'),
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property('errors').to.deep.eq([
        "Email can't be blank",
        "Email is invalid",
      ])
    });
  })
})

describe('should Login Successfully', () =>
{
  it('if send request correctly', ()=> {
    cy.api({
      url: `/login`,
      method: 'POST',
      body: {
        email: Cypress.env('email'),
        password: Cypress.env('password'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).property("message","Success login")
      expect(response.body).property('data').to.deep.eq({
        "id": 2,
        "name": "rio saputra",
        "email": "rioputra191101@gmail.com"
      })
    });
  })
})

describe('should Login Unsuccessfully', () =>
{
  it('should Login with invalid email', ()=> {
    cy.api({
      url: `/login`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        email: "invalidEmail@mail.com",
        password: Cypress.env('password'),
      },
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('errors', 'User Not Found!!');
    });
  })

  it('should Login with invalid password', ()=> {
    cy.api({
      url: `/login`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        email: Cypress.env('email'),
        password: 'invalid password',
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).to.have.property("errors", "Invalid username or password");
    });
  })
})

describe('Get All Users', () =>
{
  it('if send request correctly', ()=> {
    cy.api({
      method: 'GET',
      url: '/users',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message","success",);
      expect(response.body).to.have.property("data");
    });
  })
})


