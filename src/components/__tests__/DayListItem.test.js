import React from "react";

import { render, cleanup, prettyDOM, waitForElement, getByText, getAllByTestId, fireEvent, getByAltText, queryByText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("DayListItem", () => {

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

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });



  it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {

    //1. Render the Application.

    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.

    // 3. Click the "Edit" button on the first booked appointment. If not find, returns null.

    //4. Check that the form is in SHOW Mode and/or the student name is inputted.

    // 5. Click the "Confirm" button on the CONFIRM view.

    //6. Select a new interviewer

    //7. Click the "Save" button on the CREATE view.

    //8. COnfirm that the "Saving" transiton appears.

    //9. Confirm the view is back to the SHOW view.



  })
})