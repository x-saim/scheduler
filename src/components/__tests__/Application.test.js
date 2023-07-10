import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {

    //Render the Application component.
    const { getByText, getByPlaceholderText } = render(<Application />)

    //Wait until the text 'Archie Cohen' is displayed
    await waitForElement(() => getByText("Archie Cohen"))

    //Click the "Add" button on the first empty appointment
    fireEvent.click(getByText("Add"));

    //Enter the name "lydia Miller-Jones" into the input with the placeholder "Enter Student Name"

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });


  });

})