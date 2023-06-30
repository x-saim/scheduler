import React from "react";
import 'components/Appointment/styles.scss'

//helpers
import useVisualMode from "hooks/useVisualMode";

//sub components
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
//Constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";

export default function Appointment({ time, interview, interviewers, bookInterview, id, cancelInterview }) {
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    // Use the transition function to update the mode to "SAVING"
    transition(SAVING)

    //waiting for the asynchronous PUT request to complete
    try {
      await bookInterview(id, interview);
      // // Transition to SHOW mode after saving
      setTimeout(() => {
        transition(SHOW);
      }, 1000); // Delay the transition to SHOW mode by 1000 milliseconds/1second
    }

    catch (error) {
      console.log(error); // Handle error
    }

  }

  async function cancel(id) {

    try {
      //transition(CONFIRM);

      transition(DELETE)

      await cancelInterview(id);
      setTimeout(() => {
        transition(EMPTY);
      }, 1000); // Delay the transition to EMPTY mode by 500 milliseconds

    } catch (error) {
      console.log(error);// Handle error
    }

  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save} />}
      {mode === SAVING &&
        <Status
          message={`Booking interview...`} />}
      {mode === CONFIRM &&
        <Confirm
          message={'Are you sure you want to delete?'}
          onCancel={() => transition(CREATE)}
          onConfirm={() => cancel(id)} />}

      {mode === DELETE && <Status message={"Deleting"} />}

    </article>
  )
}