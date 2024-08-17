/// <reference types="cypress"/>

describe('Get Data result by test_case', () =>
{
  it('User will see result by test_case', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/results`,
      method: 'GET',
      headers: {
        authorization,
      },
      body:{
        "test_case_id": 3
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Success",);
      expect(response.body).property('data')
    });
  })

  it('User will see all his results with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/results`,
      method: 'GET',
      failOnStatusCode: false,
      headers: {
        authorization,
      },
      body:{
        "test_case_id": 3
      }
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body).property('errors').to.deep.eq([
        "Forbidden",
      ])
    });
  })
  it('User will see all his results with no token', ()=> {
    cy.api({
      url: `/results`,
      method: 'GET',
      failOnStatusCode: false,
      body:{
        "test_case_id": 3
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).property('errors').to.deep.eq([
        "Not Authenticated",
      ])
    });
  })
})

describe('Create results', () =>
{
  // it('if send request correctly', () => {
  //   cy.fixture('resultData.json').then((json)=>{
  //     cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
  //       const token = Cypress.env('token');
  //       const authorization = `bearer ${ token }`;
  //       const formData = new FormData();
  //       formData.append('test_case_id', json.test_case_id);
  //       formData.append('actual', json.actual);
  //       formData.append('status', json.status);
  //       formData.append('priority', json.priority);
  //       formData.append('severity', json.severity);
  //       formData.append('img_url', file, 'sharingan.jpg');
  //       formData.append('note', json.note)
  //       cy.api({
  //         method: 'POST',
  //         url: '/results',
  //         body: formData, 
  //         headers: {
  //           authorization,
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }).then((response) => {
  //         expect(response.status).to.eq(201);
  //       });
  //     })
  //   })
  // });
  it('create a results with invalid token', () => {
    cy.fixture('resultData.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const token = 'invalidToken';
        const authorization = `bearer ${ token }`;
        const formData = new FormData();
        formData.append('test_case_id', json.test_case_id);
        formData.append('actual', json.actual);
        formData.append('status', json.status);
        formData.append('priority', json.priority);
        formData.append('severity', json.severity);
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('note', json.note)
        cy.api({
          method: 'POST',
          url: '/results',
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
  it('create a results with no token', () => {
    cy.fixture('resultData.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const formData = new FormData();
        formData.append('test_case_id', json.test_case_id);
        formData.append('actual', json.actual);
        formData.append('status', json.status);
        formData.append('priority', json.priority);
        formData.append('severity', json.severity);
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('note', json.note)
        cy.api({
          method: 'POST',
          url: '/results',
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
})
  
describe('Update results', () =>
{
  it('if send request correctly', () => {
    cy.fixture('updateDataResult.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const token = Cypress.env('token');
        const authorization = `bearer ${ token }`;
        const formData = new FormData();
        formData.append('test_case_id', json.test_case_id);
        formData.append('actual', json.actual);
        formData.append('status', json.status);
        formData.append('priority', json.priority);
        formData.append('severity', json.severity);
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('note', json.note)
        cy.api({
          method: 'PUT',
          url: '/results/56',
          body: formData, 
          headers: {
            authorization,
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      })
    })
  });
  it('update a result with unregistered id', () => {
    cy.fixture('updateDataResult.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const token = Cypress.env('token');
        const authorization = `bearer ${ token }`;
        const formData = new FormData();
        formData.append('test_case_id', json.test_case_id);
        formData.append('actual', json.actual);
        formData.append('status', json.status);
        formData.append('priority', json.priority);
        formData.append('severity', json.severity);
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('note', json.note)
        cy.api({
          method: 'PUT',
          url: '/results/999',
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
  it('update a result with invalid token', () => {
    cy.fixture('updateDataResult.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const token = 'invalidToken';
        const authorization = `bearer ${ token }`;
        const formData = new FormData();
        formData.append('test_case_id', json.test_case_id);
        formData.append('actual', json.actual);
        formData.append('status', json.status);
        formData.append('priority', json.priority);
        formData.append('severity', json.severity);
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('note', json.note)
        cy.api({
          method: 'PUT',
          url: '/results/56',
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
  it('update a result with no token', () => {
    cy.fixture('updateDataResult.json').then((json)=>{
      cy.fixture('sharingan.jpg', 'binary').then(Cypress.Blob.binaryStringToBlob).then((file)=>{
        const formData = new FormData();
        formData.append('test_case_id', json.test_case_id);
        formData.append('actual', json.actual);
        formData.append('status', json.status);
        formData.append('priority', json.priority);
        formData.append('severity', json.severity);
        formData.append('img_url', file, 'sharingan.jpg');
        formData.append('note', json.note)
        cy.api({
          method: 'PUT',
          url: '/results/56',
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
})

describe('Delete results', () =>
{
  // it('if send request correctly', ()=> {
  //   const token = Cypress.env('token');
  //   const authorization = `bearer ${ token }`;
  //   cy.api({
  //     url: `/results/58`,
  //     method: 'DELETE',
  //     headers: {
  //       authorization,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.have.property("message", "Result successfully Deleted");
  //     expect(response.body).property('data')
  //   });
  // })
  it('delete result with unregistered id', ()=> {
    const token = Cypress.env('token');
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/results/999`,
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
  it('delete result with with invalid token', ()=> {
    const token = "invalid token";
    const authorization = `bearer ${ token }`;
    cy.api({
      url: `/results/58`,
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
      url: `/results/58`,
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