import React from "react";

import { render, cleanup, prettyDOM, waitForElement, getByText, getAllByTestId, fireEvent, getByAltText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("DayListItem", () => {

  // it("renders without crashing", () => {
  //   render(<DayListItem />);
  // });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //returned value is an array of DOM nodes
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1];


    console.log(prettyDOM(appointment))
    debug()

    // 3. Click the "Delete" button on the first booked appointment.
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
})


// it("renders 'no spots remaining' when there are 0 spots", () => {
//   const { getByText } = render(<DayListItem name="Monday" spots={0} />);
//   expect(getByText("no spots remaining")).toBeInTheDocument();
// });

// it("renders '1 spot remaining' when there is 1 spot", () => {
//   const { getByText } = render(<DayListItem name="Monday" spots={1} />);
//   expect(getByText("1 spot remaining")).toBeInTheDocument();
// });

// it("renders '2 spots remaining' when there are 2 spots", () => {
//   const { getByText } = render(<DayListItem name="Monday" spots={2} />);
//   expect(getByText("2 spots remaining")).toBeInTheDocument();
// });