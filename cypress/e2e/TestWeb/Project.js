/// <reference types="cypress"/>
import { ProjectPage } from "../../PageObjects/ProjectPage"

describe('Validate project Functionality', () =>
{
  const projectPage = new ProjectPage()
  beforeEach(()=>{
    cy.Login(Cypress.env('email'), Cypress.env('password'))
  })

  it('create project successfully', ()=> 
  {
    projectPage.createProjectButton()
    projectPage.validateCreateProjectPage('Create Project')
    projectPage.formProjectName('new project')
    projectPage.formPlatformType('Manual', 'Web')
    // projectPage.addItemButton()
  })
  it('create project by click close button', ()=> 
  {
    projectPage.createProjectButton()
    projectPage.validateCreateProjectPage('Create Project')
    projectPage.formProjectName('new project')
    projectPage.formPlatformType('Manual', 'Web')
    projectPage.closeButton()
  })
  it('update project successfully by clear data', ()=> 
  {
    projectPage.editIcon()
    projectPage.validateEditProjectPage('Edit Project')
    projectPage.formClearProject('update new')
    projectPage.formPlatformType('Manual', 'Web')
    projectPage.editItemButton()
  })
  it('update project successfully by add data project name', ()=> 
  {
    projectPage.editIcon()
    projectPage.validateEditProjectPage('Edit Project')
    projectPage.formAddDateProject('  kali')
    projectPage.formPlatformType('Manual', 'Web')
    projectPage.editItemButton()
  })
  it('update project by click close button', ()=> 
  {
    projectPage.editIcon()
    projectPage.validateEditProjectPage('Edit Project')
    projectPage.formClearProject('update new')
    projectPage.formPlatformType('Manual', 'Web')
    projectPage.closeButton()
  })
  
  it('delete project successfully', ()=>
  {
    // cy.xpath("(//img[@alt='List Icon'])[7]").click()
    projectPage.deleteIcon()
    projectPage.validateDeleteProjectPage('Are you sure to delete project')
    // cy.xpath("//button[normalize-space()='Delete']").click()
  })
  it('delete project by click cancel button', ()=>
  {
    projectPage.deleteIcon()
    projectPage.validateDeleteProjectPage('Are you sure to delete project')
    projectPage.cancelDeleteItemButton()
  })
  it('delete project by click close button', ()=>
  {
    projectPage.deleteIcon()
    // cy.get('.text-center').should('have.text', "Are you sure to delete project")
    projectPage.validateDeleteProjectPage('Are you sure to delete project')
    // cy.get('.cursor-pointer').click()
    projectPage.closeButton()
  })
})