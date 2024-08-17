/// <reference types="cypress"/>

describe('Get all Data versions by project', () =>
{
  it('User will see all his versions by project', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions`,
      method: 'GET',
      headers: {
        authorization,
      },
      body:{
        "project_id": "23",
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "success",);
      expect(response.body).property('data')
    });
  })

  it('User will see all his versions with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions`,
      method: 'GET',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body:{
        "project_id": "23",
      }
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('User will see all his versions with no token', ()=> {
    cy.api({
      url: `/versions`,
      method: 'GET',
      failOnStatusCode: false,
      body:{
        "project_id": "23",
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Get data versions by id', () =>
{
  it('User will see his versions by id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/28`,
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
  it('User will see his versions with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/999`,
      method: 'GET',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).to.have.property("errors", "Access denied");
    });
  })
  it('User will see his versions with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/28`,
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
  it('User will see his versions with no token', ()=> {
    cy.api({
      url: `/versions/28`,
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

describe('Create version', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/versions`,
  //     method: 'POST',
  //     headers: {
  //       authorization,
  //     },
  //     body: {
  //       name : "Version new",
  //       project_id : 23
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body).to.have.property("message", "Version successfully Created");
  //     expect(response.body).property('data')
  //   });
  // })
  it('create a version without filling in the data name', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "",
        project_id : "23"
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property("name").to.deep.eq([
        "can't be blank"
      ])
    });
  })
  it('create a version with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "nana",
        project_id : "23"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('create a version with no token', ()=> {
    cy.api({
      url: `/versions`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name : "nana",
        project_id : "23"
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Update versions', () =>
{
  it('if send request correctly', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/28`,
      method: 'PUT',
      headers: {
        authorization,
      },
      body: {
        name : "Version new update",
        project_id : 23
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Version successfully Updated");
      expect(response.body).property('data')
    });
  })
  it('update a version without filling in the data', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/28`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "",
        project_id : 23
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Version successfully Updated");
      expect(response.body).property('data').to.deep.eq({
        "id": 28,
        "name": "",
        "status": false,
        "project_id": 23
      })
    });
  })
  it('update a version with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/999`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "version update",
        project_id : 23
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).to.have.property("errors", "Access denied");
    });
  })
  it('update a version with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/37`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "version update",
        project_id : 23
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('update a version with no token', ()=> {
    cy.api({
      url: `/versions/37`,
      method: 'PUT',
      failOnStatusCode: false,
      body: {
        name : "version update",
        project_id : 23
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Delete versions', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/versions/72`,
  //     method: 'DELETE',
  //     headers: {
  //       authorization,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.have.property("message", "Version successfully Deleted");
  //     expect(response.body).property('data')
  //   });
  // })
  it('delete version with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/999`,
      method: 'DELETE',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).to.have.property("errors", "Access denied");
    });
  })
  it('delete version with with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/versions/72`,
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
  it('delete version with with no token', ()=> {
    cy.api({
      url: `/versions/72`,
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