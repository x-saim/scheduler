import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText } from "@testing-library/react";

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
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));


    //Find the specific day node that contains the text "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      //we want to have the value null returned if it doesn't find the node so we use queryByText instead of getBy
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

})