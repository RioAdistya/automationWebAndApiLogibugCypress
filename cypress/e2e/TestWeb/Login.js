/// <reference types="cypress"/>

import { LoginPage } from "../../PageObjects/LoginPage"

describe('Validate login Functionality', () =>
{
  const loginPage = new LoginPage()
  beforeEach(()=>{
    loginPage.navigate()
    loginPage.testingNowButton()
    loginPage.validateLoginPage('Login')
  })

  it('Login using an account that has been registered', ()=> 
  {
    loginPage.loginForm(Cypress.env('email'), Cypress.env('password'))
    loginPage.loginButton()
    // loginPage.validateHomePage('Hello, rio saputra ')
    // cy.wait(5000)
  })
  it('Login using invalid email and password', ()=> 
  {
    loginPage.loginForm("invalid@mail.com", "invalida")
    loginPage.loginButton()
    loginPage.validateinvalidEmail("The email you entered is incorrect")
    loginPage.validateinvalidPassword("The password you entered is incorrect")
  })
})