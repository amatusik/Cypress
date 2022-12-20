import { generateFakeUserData } from "../../support/methods/generate-data";
import { loginSelectors } from "../../support/selectors/login";
import { commonSelectors } from "../../support/selectors/common";
import { API, ALERTS, ROUTES, TRANSLATIONS } from "../../support/methods/helpers/constants";

const user = generateFakeUserData();

describe("Login form tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Login with invalid email shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain);
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct);
    cy.clickOn(loginSelectors.buttons.login);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  });

  it("Login with no data entered shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clearElement(loginSelectors.inputs.email);
    cy.clearElement(loginSelectors.inputs.password);
    cy.clickOn(loginSelectors.buttons.login);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  });

  it("Login as not registered user shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct);
    cy.clickOn(loginSelectors.buttons.login);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidCredentials()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  });

  it("Login with no password shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.clearElement(loginSelectors.inputs.password);
    cy.clickOn(loginSelectors.buttons.login);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidCredentials()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  });

  it("Login with no email entered shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain);
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct);
    cy.clickOn(loginSelectors.buttons.login);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
  });

  it("Clear input after invalid credentials shows no validation errors", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clearElement(loginSelectors.inputs.email);
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct);
    cy.clickOn(loginSelectors.buttons.login);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, true);
    cy.clearElement(loginSelectors.inputs.email);
    cy.clearElement(loginSelectors.inputs.password);
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, false);
    cy.checkIfInputHasAnError(loginSelectors.inputs.password, false);
    cy.checkIfElementIsNotDisplayed(commonSelectors.alerts.errorMessage);
  });

  it("User is able to show the password", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct);
    cy.checkIfPasswordIsVisible(loginSelectors.inputs.password, false);
    cy.clickOn(loginSelectors.buttons.showHide);
    cy.checkIfPasswordIsVisible(loginSelectors.inputs.password, true);
    cy.clickOn(loginSelectors.buttons.showHide);
    cy.checkIfPasswordIsVisible(loginSelectors.inputs.password, false);
  });

  it("User is able to clear email input", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.fillInputField(loginSelectors.inputs.password, user.password.correct);
    cy.clickOn(loginSelectors.buttons.inputClear);
    cy.checkIfInputIsEmpty(loginSelectors.inputs.email);
  });
});

describe("Login page lanuage change", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Change language to Italiano", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.selectLanguage(loginSelectors.dropdowns.languagePicker, "Italiano");
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      TRANSLATIONS.Italian.login()
    );
  });

  it("Change language to Français", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.selectLanguage(loginSelectors.dropdowns.languagePicker, "Français");
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      TRANSLATIONS.French.login()
    );
  });

  it("Change language to Deutsch", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.selectLanguage(loginSelectors.dropdowns.languagePicker, "Deutsch");
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      TRANSLATIONS.German.login()
    );
  });
});

describe("Login in with SSO", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("User is able to switch to password login", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clickOn(loginSelectors.buttons.ssoLogin);
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      "Log in with SSO"
    );
    cy.checkIfElementIsVisible(loginSelectors.buttons.loginWithPassword);
    cy.clickOn(loginSelectors.buttons.loginWithPassword);
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.checkIfElementIsVisible(loginSelectors.inputs.password);
  });

  it("Login with no email shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clickOn(loginSelectors.buttons.ssoLogin);
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      "Log in with SSO"
    );
    cy.clearElement(loginSelectors.inputs.email);
    cy.clickOn(loginSelectors.buttons.loginWithSSO);
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
  });

  it("Login with invalid email shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clickOn(loginSelectors.buttons.ssoLogin);
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      "Log in with SSO"
    );
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain);
    cy.clickOn(loginSelectors.buttons.loginWithSSO);
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
  });

  it("Login with valid email with no SSO provider shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clickOn(loginSelectors.buttons.ssoLogin);
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      "Log in with SSO"
    );
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.clickOn(loginSelectors.buttons.loginWithSSO);
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.noSSOProvider()
    );
  });

  it("Clear input after invalid details shows no validation errors", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clickOn(loginSelectors.buttons.ssoLogin);
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      "Log in with SSO"
    );
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.clickOn(loginSelectors.buttons.loginWithSSO);
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.noSSOProvider()
    );
    cy.clearElement(loginSelectors.inputs.email);
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, false);
    cy.checkIfElementIsNotDisplayed(commonSelectors.alerts.errorMessage);
  });

  it("User is able to clear email input", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Log in");
    cy.clickOn(loginSelectors.buttons.ssoLogin);
    cy.checkElementContainsValue(
      loginSelectors.containers.titleBox,
      "Log in with SSO"
    );
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.clickOn(loginSelectors.buttons.inputClear);
    cy.checkIfInputIsEmpty(loginSelectors.inputs.email);
  });
});

describe("API Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Login through API", () => {
    //expected to fail since the user is not registered.
    cy.waitUntil(() =>
      cy.getCookie("csrftoken").then((cookie) => cookie?.value)
    ).then((token) => {
      cy.request({
        method: "POST",
        url: API.LOGIN,
        form: true,
        body: {
          email: user.email.correct,
          password: user.password.correct,
        },
        headers: {
          "X-CSRFToken": token.value,
          Referer: Cypress.config().baseUrl,
        },
      })
        .its("status")
        .should("eq", 200);
    });
  });
});

describe("Password reset", () => {
  beforeEach(() => {
    cy.visit(ROUTES.PASSWORD_RESET);
  });

  it("Password reset with invalid email shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Can't log in?");
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain);
    cy.findByRole("button", { name: /send link/i }).should("be.visible").click();
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
  });

  it("Password reset without email shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Can't log in?");
    cy.findByRole("button", { name: /send link/i }).should("be.visible").click();
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
  });

  it("Password reset with valid email shows proper validation message", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Can't log in?");
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.findByRole("button", { name: /send link/i }).should("be.visible").click();
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, false);
    cy.findByRole("button", { name: /sent/i }).should("be.visible");
  });

  it("User is able to clear email input on password rest", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Can't log in?");
    cy.fillInputField(loginSelectors.inputs.email, user.email.correct);
    cy.clickOn(loginSelectors.buttons.inputClear);
    cy.checkIfInputIsEmpty(loginSelectors.inputs.email);
  });

  it("User doesn't see validation errors after clearing email input on password reset", () => {
    cy.checkElementContainsValue(loginSelectors.containers.titleBox, "Can't log in?");
    cy.fillInputField(loginSelectors.inputs.email, user.email.withoutDomain);
    cy.findByRole("button", { name: /send link/i }).should("be.visible").click();
    cy.checkIfTextIsShown(
      commonSelectors.alerts.errorMessage,
      ALERTS.invalidEmail()
    );
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, true);
    cy.clickOn(loginSelectors.buttons.inputClear);
    cy.checkIfInputIsEmpty(loginSelectors.inputs.email);
    cy.checkIfInputHasAnError(loginSelectors.inputs.email, false);
  });
});
