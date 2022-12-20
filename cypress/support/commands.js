/// <reference types="cypress" />
import 'cypress-wait-until';
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('fillInputField', (selector, value) => {
    cy.get(selector).clear().type(value)
  })

  Cypress.Commands.add('clickOn', (selector) => {
    cy.get(selector).click()
  })

  Cypress.Commands.add('checkIfTextIsShown', (selector, text) => {
    cy.get(selector).contains(text).should('be.visible')
  })

  Cypress.Commands.add('checkIfElementIsNotDisplayed', (selector) => {
    cy.get(selector).should('not.exist')
  })

  Cypress.Commands.add('clearElement', (selector) => {
    cy.get(selector).clear()
  })

  Cypress.Commands.add('checkElementContainsValue', (selector, value) => {
    cy.get(selector).contains(value)
  })

  Cypress.Commands.add('selectLanguage', (selector, value) => {
    cy.get(selector).click()
    cy.contains('span', value).click();
    cy.get(selector).within(() => {
      cy.get('span').should('contain.text', value)
    })
  })

  Cypress.Commands.add('checkIfInputHasAnError', (selector, value) => {
    if(value)
    cy.get(selector).parent().should('have.class', 'Input_error__HPh_6')
    else {
      cy.get(selector).parent().should('not.have.class', 'Input_error__HPh_6')
    }
  })

  Cypress.Commands.add('checkIfElementIsVisible', (selector) => {
    cy.get(selector).should('be.visible')
  })

  Cypress.Commands.add('checkIfPasswordIsVisible', (selector, isVisible) => {
    if (isVisible) {
      cy.get(selector).invoke('attr', 'type').should('eq', 'text')
    } else {
      cy.get(selector).invoke('attr', 'type').should('eq', 'password')
    }
  })

  Cypress.Commands.add('checkIfInputIsEmpty', (selector) => {
    cy.get(selector).invoke('attr', 'value').should('be.empty')
  })