/// <reference types="cypress"/>

describe('Get all Data test_cases by version', () =>
{
  it('User will see all his test_cases by version', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases`,
      method: 'GET',
      headers: {
        authorization,
      },
      body:{
        "version_id": 28
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "success",);
      expect(response.body).property('data')
    });
  })

  it('User will see all his test_cases with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases`,
      method: 'GET',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body:{
        "version_id": 28
      }
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('User will see all his test_cases with no token', ()=> {
    cy.api({
      url: `/test_cases`,
      method: 'GET',
      failOnStatusCode: false,
      body:{
        "version_id": 28
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Get data test_case by id', () =>
{
  it('User will see his test_cases by id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/3`,
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
  it('User will see his test_cases with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/999`,
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
  it('User will see his test_cases with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/3`,
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
  it('User will see his test_cases with no token', ()=> {
    cy.api({
      url: `/test_cases/3`,
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

describe('Create test_cases', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/test_cases`,
  //     method: 'POST',
  //     headers: {
  //       authorization,
  //     },
  //     body: {
  //       test_category : 1,
  //       scenario_id :7,
  //       version_id :28,
  //       pre_condition : "test case new 2",
  //       testcase : "test case new 2",
  //       test_step : "test case new 2",
  //       expectation : "test case new 2"
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body).to.have.property("message", "Test case successfully Created");
  //     expect(response.body).property('data')
  //   });
  // })
  it('create a test_case without filling in the data name', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        test_category : "",
        scenario_id :7,
        version_id :28,
        pre_condition : "",
        testcase : "",
        test_step : "",
        expectation : ""
      },
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).property("message").to.deep.eq({
      "test_category": [
          "can't be blank"
      ],
      "pre_condition": [
          "can't be blank"
      ],
      "testcase": [
          "can't be blank"
      ],
      "test_step": [
          "can't be blank"
      ],
      "expectation": [
          "can't be blank"
      ]
      })
    });
  })
  it('create a test_case with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases`,
      method: 'POST',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        test_category : 1,
        scenario_id :7,
        version_id :28,
        pre_condition : "test case new 2",
        testcase : "test case new 2",
        test_step : "test case new 2",
        expectation : "test case new 2"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('create a test_case with no token', ()=> {
    cy.api({
      url: `/test_cases`,
      method: 'POST',
      failOnStatusCode: false,
      body: {
        test_category : 1,
        scenario_id :7,
        version_id :28,
        pre_condition : "test case new 2",
        testcase : "test case new 2",
        test_step : "test case new 2",
        expectation : "test case new 2"
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Update test_cases', () =>
{
  it('if send request correctly', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/3`,
      method: 'PUT',
      headers: {
        authorization,
      },
      body: {
        test_category : 1,
        pre_condition : "test case new 2",
        testcase : "test case new 2",
        test_step : "test case new 2",
        expectation : "test case new 2"
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Test case successfully Updated");
      expect(response.body).property('data')
    });
  })
  it('update a test_case without filling in the data', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/3`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        test_category : "",
        pre_condition : "",
        testcase : "",
        test_step : "",
        expectation : ""
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Test case successfully Updated");
      expect(response.body).property('data').to.deep.eq({
        "id": 3,
        "version_id": 28,
        "scenario_id": 10,
        "test_category": null,
        "pre_condition": "",
        "testcase": "",
        "test_step": "",
        "expectation": "",
        "status": null
      })
    });
  })
  it('update a test_case with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/999`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        test_category : 1,
        pre_condition : "test case new 2",
        testcase : "test case new 2",
        test_step : "test case new 2",
        expectation : "test case new 2"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).to.have.property("errors", "Access denied");
    });
  })
  it('update a test_case with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/3`,
      method: 'PUT',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body: {
        test_category : 1,
        pre_condition : "test case new 2",
        testcase : "test case new 2",
        test_step : "test case new 2",
        expectation : "test case new 2"
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('update a test_case with no token', ()=> {
    cy.api({
      url: `/test_cases/3`,
      method: 'PUT',
      failOnStatusCode: false,
      body: {
        test_category : 1,
        pre_condition : "test case new 2",
        testcase : "test case new 2",
        test_step : "test case new 2",
        expectation : "test case new 2"
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Delete test_cases', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/test_cases/14`,
  //     method: 'DELETE',
  //     headers: {
  //       authorization,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.have.property("message", "Test case successfully Deleted");
  //     expect(response.body).property('data')
  //   });
  // })
  it('delete test_case with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/999`,
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
  it('delete test_case with with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/test_cases/7`,
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
  it('delete test_case with with no token', ()=> {
    cy.api({
      url: `/test_cases/7`,
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