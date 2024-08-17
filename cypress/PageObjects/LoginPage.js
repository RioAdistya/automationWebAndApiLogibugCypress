/// <reference types="cypress" />

export class LoginPage {
  navigate() {
    cy.visit('https://logibug.netlify.app/')
  }

  testingNowButton() {
    cy.xpath("//a[normalize-space()='Login']").click()
  }

  loginForm(email, password) {
    cy.get('#email').type(email)
    cy.get('#password').type(password)
  }

  loginButton() {
    cy.xpath("//button[normalize-space()='Log in']").click()
  }

  validateLoginPage(loginPage){
    cy.xpath("//h1[normalize-space()='Login']").should('have.text', loginPage)
  }

  validateHomePage(homePage){
    cy.xpath("//h1[normalize-space()='Hello, rio saputra']", {timeOut:6000}).should('have.text', homePage)
  }

  validateinvalidEmail(invalidEmail){
    cy.xpath("//p[normalize-space()='The email you entered is incorrect']", {timeOut:6000}).should('contain', invalidEmail)
  }

  validateinvalidPassword(invalidPassword){
    cy.xpath("//p[normalize-space()='The password you entered is incorrect']", {timeOut:6000}).should('contain', invalidPassword)
  }
}