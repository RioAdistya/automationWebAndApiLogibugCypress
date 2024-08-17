/// <reference types="cypress"/>
// import { ProjectPage } from "../../PageObjects/ProjectPage"

describe('Validate version Functionality', () =>
{
  // const projectPage = new ProjectPage()
  beforeEach(()=>{
    cy.Login(Cypress.env('email'), Cypress.env('password'))
    // cy.xpath("(//img)[10]").click()
    cy.get(':nth-child(2) > .w-full').click()
  })

  it('create version successfully', ()=> 
  {
    cy.xpath("//button[normalize-space()='Create version']").click()
    cy.xpath("//h1[normalize-space()='Create Version']").should('have.text', "Create Version")
    cy.get('#version-name').type("new version del")
    // cy.xpath("//button[normalize-space()='Add Item']").click()
    cy.get('form > .flex > .ml-auto').click()
  })
  it('create version by click close button', ()=> 
  {
    cy.xpath("//button[normalize-space()='Create version']").click()
    cy.xpath("//h1[normalize-space()='Create Version']").should('have.text', "Create Version")
    cy.get('.cursor-pointer').click()
  })
  it('update version successfully by clear data', ()=> 
  {
    // cy.xpath("//h1[normalize-space()='Edit Version']").should('have.text', "Edit Version")
    cy.get("#version-name").clear().type("version automation")
    cy.xpath("//button[normalize-space()='Update Item']").click()
  })
  // it('update version successfully by add data version name', ()=> 
  // {
  //   cy.get(':nth-child(4) > .border-b > .gap-3 > :nth-child(3) > .h-5').click()
  //   cy.xpath("//h1[normalize-space()='Edit Version']").should('have.text', "Edit Version")
  //   cy.get("#version-name").type("  kali")
  //   cy.xpath("//button[normalize-space()='Update Item']").click()
  // })
  // it('update version by click close button', ()=> 
  // {
  //   cy.get(':nth-child(4) > .border-b > .gap-3 > :nth-child(3) > .h-5').click()
  //   cy.xpath("//h1[normalize-space()='Edit Version']").should('have.text', "Edit Version")
  //   cy.get('.cursor-pointer').click()
  // })
  // it('delete version successfully', ()=>
  // {
  //   cy.get(':nth-child(5) > .border-b > .gap-3 > :nth-child(1) > .h-5').click()
  //   cy.get('.text-center').should('have.text', "Are you sure to delete project")
  //   // cy.xpath("//button[normalize-space()='Delete']").click()
  // })
  // it('delete version by click cancel button', ()=>
  // {
  //   cy.get(':nth-child(5) > .border-b > .gap-3 > :nth-child(1) > .h-5').click()
  //   cy.get('.text-center').should('have.text', "Are you sure to delete project")
  //   cy.xpath("//button[normalize-space()='Cancel']").click()
  // })
  // it('delete version by click close button', ()=>
  // {
  //   cy.get(':nth-child(5) > .border-b > .gap-3 > :nth-child(1) > .h-5').click()
  //   cy.get('.text-center').should('have.text', "Are you sure to delete project")
  //   cy.get('.cursor-pointer').click()
  // })
})