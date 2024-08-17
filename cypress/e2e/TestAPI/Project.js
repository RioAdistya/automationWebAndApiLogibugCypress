/// <reference types="cypress"/>

describe('Get all Data project', () =>
{
  it('User will see all his projects', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects`,
      method: 'GET',
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Success");
      expect(response.body).property('data')
    });
  })
  it('User will see all his projects with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects`,
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
  it('User will see all his projects with no token', ()=> {
    cy.api({
      url: `/projects`,
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

describe('Get data project by id', () =>
{
  it('User will see his projects by id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/23`,
      method: 'GET',
      headers: {
        authorization,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Success");
      expect(response.body).property('data')
    });
  })
  it('User will see his projects with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/999`,
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
  it('User will see his projects with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/23`,
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
  it('User will see his projects with no token', ()=> {
    cy.api({
      url: `/projects/23`,
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

describe('Create project', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/projects`,
  //     method: 'POST',
  //     headers: {
  //       authorization,
  //     },
  //     body: {
  //       name:"First Project automation",
  //       type_test : "manual",
  //       platform : "mobile"
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body).to.have.property("message","Project and first version successfully Created");
  //     expect(response.body).property('data')
  //   });
  // })
  it('create a project without filling in the data', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name:"",
        type_test : "",
        platform : ""
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).to.deep.eq({
        "name": [
          "can't be blank"
        ],
        "type_test": [
          "can't be blank"
        ],
        "platform": [
          "can't be blank"
        ]
      })
    });
  })
  // it('create a project without filling in type_test and platform', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/projects`,
  //     method: 'POST',
  //     headers: {
  //       authorization,
  //     },
  //     body: {
  //       name:"testtes",
  //       type_test : "",
  //       platform : ""
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body).to.have.property("message","Project and first version successfully Created");
  //     expect(response.body).property('data')
  //   });
  // })
  it('create projects by filling in data type tests and platforms other than web, mobile, manual and automatic', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name:"testtes",
        type_test : "ranran",
        platform : "ranran"
      },
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  })
  it('create a project with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name:"First Project automation",
        type_test : "manual",
        platform : "mobile"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('create a project with no token', ()=> {
    cy.api({
      url: `/projects`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        name:"First Project automation",
        type_test : "manual",
        platform : "mobile"
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Update project', () =>
{
  it('if send request correctly', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/22`,
      method: 'PUT',
      headers: {
        authorization,
      },
      body: {
        name:"First Project 22 update",
        type_test : "manual",
        platform : "mobile"
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Project successfully updated");
      expect(response.body).property('data')
    });
  })
  it('update a project without filling in the data', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/22`,
      method: 'PUT',
      headers: {
        authorization,
      },
      body: {
        name:"",
        type_test : "",
        platform : ""
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Project successfully updated");
      expect(response.body).property('data').to.deep.eq({
        "id": 22,
        "name": "",
        "type_test": null,
        "platform": null
      })
    });
  })
  it('update projects by filling in data type tests and platforms other than web, mobile, manual and automatic', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/22`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name:"project updated",
        type_test : "ranran",
        platform : "ranran"
      },
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  })
  it('update projects with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/999`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name:"project updated",
        type_test : "manual",
        platform : "mobile"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).to.have.property("errors", "Access denied");
    });
  })
  it('update projects with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/23`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        name:"project updated",
        type_test : "manual",
        platform : "mobile"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('update projects with no token', ()=> {
    cy.api({
      url: `/projects/23`,
      method: 'PUT',
      failOnStatusCode: false,
      body: {
        name:"project updated",
        type_test : "manual",
        platform : "mobile"
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Delete project', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/projects/57`,
  //     method: 'DELETE',
  //     headers: {
  //       authorization,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.have.property("message","Project successfully deleted");
  //     expect(response.body).property('data')
  //   });
  // })
  it('delete project with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/999`,
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
  it('delete project with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/projects/999`,
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
  it('delete project with no token', ()=> {
    cy.api({
      url: `/projects/999`,
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