/// <reference types="cypress" />

export class ProjectPage {
  navigate() {
    cy.visit('https://aplikasitesting.netlify.app/')
  }

  createProjectButton() {
    cy.xpath("//button[normalize-space()='Create Project']").click()
  }

  formProjectName(projectName){
    cy.get('#project-name').type(projectName)
  }

  formPlatformType(testingType, platform){
    cy.xpath("//select[@id='project-name']").select(testingType)
    cy.get("#platform").select(platform)
  }

  formClearProject(updateNew){
    cy.get('#project-name').clear().type(updateNew)
  }

  formAddDateProject(addNew){
    cy.get('#project-name').type(addNew)
  }

  addItemButton(){
    cy.xpath("//button[normalize-space()='Add Item']").click()
  }

  closeButton(){
    cy.get(".cursor-pointer").click()
  }

  editIcon(){
    cy.xpath("(//img[@alt='List Icon'])[8]").click()
  }

  deleteIcon(){
    cy.xpath("(//img[@alt='List Icon'])[7]").click()
  }

  editItemButton(){
    cy.xpath("(//button[normalize-space()='Edit Item'])[1]").click()
  }

  deleteItemButton(){
    cy.xpath("(//button[normalize-space()='Delete']").click()
  }

  cancelDeleteItemButton(){
    cy.xpath("//button[normalize-space()='Cancel']").click()
  }

  validateCreateProjectPage(createProjectPage){
    // cy.xpath("//button[normalize-space()='Create Project']").should('have.text', createProjectPage)
    cy.xpath("//button[normalize-space()='Create Project']").contains(createProjectPage)
  }

  validateEditProjectPage(editProjectPage){
    // cy.xpath("//h1[normalize-space()='Edit Project']").should('have.text', editProjectPage)
    cy.xpath("//h1[normalize-space()='Edit Project']").contains(editProjectPage)
  }
  validateDeleteProjectPage(editProjectPage){
    // cy.xpath("//h1[normalize-space()='Edit Project']").should('have.text', editProjectPage)
    cy.get(".text-center").contains(editProjectPage)
  }
}