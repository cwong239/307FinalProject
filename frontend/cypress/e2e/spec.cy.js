import APP_DOMAIN from "../support/deployment";

Cypress.Commands.add("changeRangeInput", (selector, value) => {
  const inputSet = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;

  return cy.get(selector).then(($input) => {
    inputSet.call($input[0], value);
    $input[0].dispatchEvent(
      new Event("input", { bubbles: true })
    );
    $input[0].dispatchEvent(
      new Event("change", { bubbles: true })
    );
  });
});

describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit(APP_DOMAIN);
  });
});

// describe("The Sign up Page", () => {
//   it("Try to sign up a new user", () => {
//     const testdata = {
//       name: "john",
//       password: "john"
//     };
//     cy.visit(`${APP_DOMAIN}/signup`);
//     cy.get('input[data-cy="username"]').type(testdata.name);
//     cy.get('input[data-cy="password"]').type(testdata.password);
//     cy.get('[data-cy="signup-button"]').click();
//     cy.url().should('eq', `${APP_DOMAIN}/signup`);
//   });
// })

describe("The Login and Edit Page", () => {
  it("Try to login as user and upload test image", () => {
    const testdata = {
      name: "john",
      password: "john"
    };
    // go to login page
    cy.visit(`${APP_DOMAIN}/login`);
    cy.get('input[data-cy="username"]').type(testdata.name);
    cy.get('input[data-cy="username"]').should(
      "have.value",
      testdata.name
    );
    cy.get('input[data-cy="password"]').type(testdata.password);
    cy.get('input[data-cy="password"]').should(
      "have.value",
      testdata.password
    );
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("eq", `${APP_DOMAIN}/`);

    // go to edit page
    cy.visit(`${APP_DOMAIN}/edit`);

    cy.get('[data-cy="image-upload"]').selectFile(
      "cypress/fixtures/test_image.jpg",
      { force: true }
    );

    cy.changeRangeInput('[data-cy="slider-brightness"]', 50)
      .get('[data-cy="slider-brightness"]')
      .should("have.value", "50");

    cy.changeRangeInput('[data-cy="slider-gamma"]', 2.5)
      .get('[data-cy="slider-gamma"]')
      .should("have.value", "2.5");

    cy.changeRangeInput('[data-cy="slider-contrast"]', 1.5)
      .get('[data-cy="slider-contrast"]')
      .should("have.value", "1.5");

    cy.changeRangeInput('[data-cy="slider-opacity"]', 0.75)
      .get('[data-cy="slider-opacity"]')
      .should("have.value", "0.75");

    // Toggle the buttons
    cy.get('[data-cy="toggle-grayscale"]').click();
    cy.get('[data-cy="toggle-grayscale"]').should(
      "contain.text",
      "True"
    );
    cy.get('[data-cy="toggle-backgroundremoval"]').click();
    cy.get('[data-cy="toggle-backgroundremoval"]').should(
      "contain.text",
      "True"
    );

    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="download"]', { timeout: 10000 })
      .should("be.visible")
      .and("not.be.disabled");
  });
});
