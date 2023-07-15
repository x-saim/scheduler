describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains("Save").click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit an interview", () => {
    // Hover over the appointment card
    cy.get(".appointment__card").trigger("mouseover");

    // Click the edit button with forced action
    cy.get("[alt='Edit']").click({ force: true });

    //Clear and change input field to Lydia Miller-Jones
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    //Select new interviewer "Tori Malcom"
    cy.get('[alt="Tori Malcolm"]').click();
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
});