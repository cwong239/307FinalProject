import APP_DOMAIN from '../support/deployment';

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit(APP_DOMAIN)
  })
})

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
    cy.visit(`${APP_DOMAIN}/login`); 
    cy.get('input[data-cy="username"]').type(testdata.name); 
    cy.get('input[data-cy="password"]').type(testdata.password); 
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('eq', `${APP_DOMAIN}/`); 

    cy.visit(`${APP_DOMAIN}/edit`)

    cy.get('[data-cy="image-upload"]').selectFile('cypress/fixtures/test_image.jpg');
  }); 
})
