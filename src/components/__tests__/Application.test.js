import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, getByDisplayValue, queryByAttribute, prettyDOM, waitForElementToBeRemoved } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";
// jest.mock('axios');
afterEach(cleanup);


describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    //wait until after the element containing "Archie Cohen" renders.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    //Returned value is an array of DOM nodes
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0];

    //To test that the saving works we need to click the add button, change the student name input and click the save button.

    fireEvent.click(getByAltText(appointment, "Add"));

    //Changing input to student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //Clicking interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //Clicking save button
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));


    //Find the specific day node that contains the text "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      //we want to have the value null returned if it doesn't find the node so we use queryByText instead of getBy
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the first booked appointment. If not find, returns null.
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments.find((appointment) => {
      return queryByText(appointment, "Archie Cohen")
    })

    fireEvent.click(getByAltText(appointment, "Delete"));

    //4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the Confirm view.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      //we want to have the value null returned if it doesn't find the node so we use queryByText instead of getBy
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    //1. Render the Application.

    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the first booked appointment. If not find, returns null.
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments.find((appointment) => {
      return queryByText(appointment, "Archie Cohen")
    })

    fireEvent.click(getByAltText(appointment, "Edit"));

    //4. Check that the form is in SHOW Mode and/or the student name is inputted.

    expect(getByDisplayValue(appointment, "Archie Cohen"))

    //5. Click and select a new interviewer

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //6. Click the "Save" button on the CREATE view.
    fireEvent.click(getByText(appointment, "Save"));


    //7. COnfirm that the "Saving" transiton appears.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //8. Confirm the view is back to the SHOW view.
    await waitForElement(() => getByText(appointment, "Archie Cohen"));
    expect(queryByAttribute("class", container, "appointment__card appointment__card--show")).toBeInTheDocument();

    //9. Check the the spots remaining 
    //Find the specific day node that contains the text "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      //we want to have the value null returned if it doesn't find the node so we use queryByText instead of getBy
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", async () => {

    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    //wait until after the element containing "Archie Cohen" renders.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    //returned value is an array of DOM nodes
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0];

    //To test that the saving works we need to click the add button, change the student name input and click the save button.
    fireEvent.click(getByAltText(appointment, "Add"));

    //changing input to student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //clicking interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //clicking save button
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();


    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Error saving appointment")).toBeInTheDocument();

  })



  it("shows the delete error when failing to delete an existing appointment", async () => {

    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments.find((appointment) => {
      return queryByText(appointment, "Archie Cohen")
    })

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error: Failed to delete"));
  })
})


//We need to make a decision if we also want to test the close buttons for the errors to make sure we return to the correct mode.