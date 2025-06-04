describe('The home page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:5173/')
  })
})

describe("The Sign up Page", () => { 
  it("Try to login as user", () => { 
    const testdata = { 
      name: "john", 
      password: "john" 
    };
    cy.visit('http://localhost:5173/signup'); 
    cy.get('input[name="name"]').type(testdata.name); 
    cy.get('input[name="job"]').type(testdata.job); 
    cy.get('input[value="Submit"]').click(); 
    cy.get("tbody > tr:last-child > td:first-of-type”) 
      .should("contain", testdata.name); 
  }); 
})

describe("The Login Page", () => { 
  it("Try to login as user", () => { 
    const testdata = { 
      name: "john", 
      password: "john" 
    };
    cy.visit('http://localhost:5173/login'); 
    cy.get('input[name="name"]').type(testdata.name); 
    cy.get('input[name="job"]').type(testdata.job); 
    cy.get('input[value="Submit"]').click(); 
    cy.get("tbody > tr:last-child > td:first-of-type”) 
      .should("contain", testdata.name); 
  }); 
})