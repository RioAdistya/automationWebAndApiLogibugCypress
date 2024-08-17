/// <reference types="cypress"/>

describe('Get all Data Scenario by project id', () =>
{
  it('User will see all his Scenarios', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios`,
      method: 'GET',
      headers: {
        authorization,
      },
      body:{
        "project_id": "23",
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "success");
      expect(response.body).property('data')
    });
  })

  it('User will see all his scenarios with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios`,
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
  it('User will see all his scenarios with no token', ()=> {
    cy.api({
      url: `/scenarios`,
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

describe('Get data scenario by id', () =>
{
  it('User will see his scenario by id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/8`,
      method: 'GET',
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "success")
      expect(response.body).property('data').to.deep.equal({
        "id": 8,
        "project_id": 23,
        "name": "scenario login",
      })
    });
  })
  it('User will see his scenario with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/999`,
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
  it('User will see his scenario with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/8`,
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
  it('User will see his scenario with no token', ()=> {
    cy.api({
      url: `/scenarios/8`,
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

describe('Create scenario', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/scenarios`,
  //     method: 'POST',
  //     headers: {
  //       authorization,
  //     },
  //     body: {
  //       project_id : 23,
  //       name : "scenario automation"
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body).to.have.property("message", "Scenario successfully Created");
  //     expect(response.body).property('data')
  //   });
  // })
  it('create a scenario without filling in the data name', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        project_id : 23,
        name : ""
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property("message").to.deep.eq({
        "name": [
          "can't be blank"
        ]
      })
    });
  })
  it('create a scenario with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        "project_id" : 23,
        "name" : "nana"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('create a scenario with no token', ()=> {
    cy.api({
      url: `/scenarios`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        "project_id" : 23,
        "name" : "nana"
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Update scenario', () =>
{
  it('if send request correctly', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/7`,
      method: 'PUT',
      headers: {
        authorization,
      },
      body: {
        name : "Version new update",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Scenario successfully Deleted");
      expect(response.body).property('data').to.deep.eq({
        "id": 7,
        "project_id": 23,
        "name": "Version new update"
      })
    });
  })
  it('update a scenario without filling in the data', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/7`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Updated");
      expect(response.body).property('data').to.deep.eq({
        "id": 7,
        "project_id": "Project Coba 1",
        "name": ""
      })
    });
  })
  it('update a scenario with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/999`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "scenario new",
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).to.have.property("errors", "Access denied");
    });
  })
  it('update a scenario with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/7`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name : "scenario new",
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('update a scenario with no token', ()=> {
    cy.api({
      url: `/scenarios/7`,
      method: 'PUT',
      failOnStatusCode: false,
      body: {
        name : "scenario new",
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
  //     url: `/scenarios/27`,
  //     method: 'DELETE',
  //     headers: {
  //       authorization,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.have.property("message","Scenario successfully Deleted");
  //     expect(response.body).property('data')
  //   });
  // })
  it('delete scenario with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/999`,
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
  it('delete scenario with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/scenarios/13`,
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
  it('delete scenario with no token', ()=> {
    cy.api({
      url: `/scenarios/13`,
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