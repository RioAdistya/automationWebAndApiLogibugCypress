/// <reference types="cypress"/>

describe('Get Data profile by Id', () =>
{
  it('user will see his profile', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/profiles`,
      method: 'GET',
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message","success");
      expect(response.body).property('data')
    });
  })

  it('user will see his profile with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/profiles`,
      method: 'GET',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('user will see his profile with no token', ()=> {
    cy.api({
      url: `/profiles`,
      method: 'GET',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('update User', () => {
  // it('user will update the profile', () => {
  //   cy.fixture('example.json').then((json)=>{
  //     cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
  //       const token = Cypress.env('token');
  //       const authorization = `bearer ${ token }`;
  //       const formData = new FormData();
  //       formData.append('img_url', file, 'sharingan.jpg');
  //       formData.append('name', json.name)
  //       cy.api({
  //         method: 'PUT',
  //         url: '/profiles',
  //         body: formData, 
  //         headers: {
  //           authorization,
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }).then((response) => {
  //         expect(response.status).to.eq(200);
  //       });
  //     })
  //   })
  // });
  it('user will update the profile with invalid token', () => {
    cy.fixture('example.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const token = "invalid token";
        const authorization = `bearer ${ token }`;
        const formData = new FormData();
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('name', json.name)
        cy.api({
          method: 'PUT',
          url: '/profiles',
          failOnStatusCode: false,
          body: formData, 
          headers: {
            authorization,
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          expect(response.status).to.eq(403);
        });
      })
    })
  });
  it('user will update the profile with no token', () => {
    cy.fixture('example.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const formData = new FormData();
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('name', json.name)
        cy.api({
          method: 'PUT',
          url: '/profiles',
          failOnStatusCode: false,
          body: formData, 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          expect(response.status).to.eq(401);
        });
      })
    })
  });
});

describe('logout', () =>
{
  it('user will log out', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/logout`,
      method: 'POST',
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "logout success");
    });
  })
  it('user will log out with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/logout`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('user will log out with no token', ()=> {
    cy.api({
      url: `/logout`,
      method: 'POST',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('delete User', () =>
{
  it('user deletes user with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/users/999`,
      method: 'DELETE',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).property("errors", "User not found")
    });
  })
  it('user deletes user with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/users/2`,
      method: 'DELETE',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('user deletes user with no token', ()=> {
    cy.api({
      url: `/users/2`,
      method: 'DELETE',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})