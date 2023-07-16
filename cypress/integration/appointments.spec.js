describe("Appointment", () => {

  // Run this before each test case
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  // Helper function to create an appointment
  const createAppointment = () => {
    cy.get("[alt=Add]").first().click(); // Click the "Add" button
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones"); // Enter the student name
    cy.get('[alt="Sylvia Palmer"]').click(); // Select the interviewer
    cy.contains("Save").click(); // Click the "Save" button
  };

  // Helper function to edit an appointment
  const editAppointment = () => {
    cy.get(".appointment__card").trigger("mouseover"); // Hover over the appointment card
    cy.get("[alt='Edit']").click({ force: true }); // Click the "Edit" button with forced action
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones"); // Clear and enter the updated student name
    cy.get('[alt="Tori Malcolm"]').click(); // Select the new interviewer
    cy.contains("Save").click(); // Click the "Save" button
  };

  // Helper function to cancel an appointment
  const cancelAppointment = () => {
    cy.get(".appointment__card").trigger("mouseover"); // Hover over the appointment card
    cy.get("[alt='Delete']").click({ force: true }); // Click the "Delete" button with forced action
    cy.contains("Confirm").click(); // Click the "Confirm" button
    cy.contains("Deleting").should("exist"); // Verify that the "Deleting" indicator exists
    cy.contains("Deleting").should("not.exist"); // Verify that the "Deleting" indicator does not exist
  };

  // Test case: should book an interview
  it("should book an interview", () => {
    createAppointment(); // Create an appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); // Verify the presence of the student name
    cy.contains(".appointment__card--show", "Sylvia Palmer"); // Verify the presence of the interviewer name
  });

  // Test case: should edit an interview
  it("should edit an interview", () => {
    editAppointment(); // Edit an existing appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); // Verify the updated student name
    cy.contains(".appointment__card--show", "Tori Malcolm"); // Verify the updated interviewer name
  });

  // Test case: should cancel an interview
  it("should cancel an interview", () => {
    cancelAppointment(); // Cancel an existing appointment
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist"); // Verify the absence of the canceled appointment
  });


  //Test Case: Testing close button on SAVE error handler.
  it("throws error on saving appointment, returns to CREATE mode when clicking close button", () => {
    cy.intercept("PUT", "/api/appointments/*", {
      statusCode: 500,
      body: { error: "Error saving appointment" },
    });
    createAppointment()
    cy.contains("Saving").should("not.exist"); // Verify that the "Saving" indicator does not exist

    cy.contains(".appointment__card--error", "Error saving appointment").should("exist");
    cy.get("[alt='Close']").click();

    cy.get("[data-testid='student-name-input']").should("have.value", "") // Verify that the input field is empty
    cy.get(".interviewers__item").should("not.have.class", "interviewers__item--selected"); // Verify that no interviewer is selected
  }
  )

  //Test Case: Testing close button on DELETE error handler.
  it("throws error on deleting appointment, returns to SHOW mode when clicking close button", () => {

    //intercept and mock the response of a DELETE request
    cy.intercept("DELETE", "/api/appointments/*", {
      statusCode: 500,
      body: { error: "Error: Failed to delete" },
    });

    cy.get(".appointment__card").trigger("mouseover");
    cy.get("[alt='Delete']").click({ force: true });
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("not.exist"); // Verify that the "Deleting" indicator does not exist

    cy.contains(".appointment__card--error", "Error: Failed to delete").should("exist");

    //Click the close button
    cy.get("[alt='Close']").click();

    cy.contains(".appointment__card--show", "Archie Cohen").should("exist");
  });

});
