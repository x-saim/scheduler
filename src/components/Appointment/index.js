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

export default function Appointment({ time, interview, interviewers, bookInterview, id, cancelInterview }) {
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // Call bookInterview with the appointment ID and interview object
    try {
      transition(SAVING)
      //waiting for the asynchronous PUT request to complete
      await bookInterview(id, interview);

      // Transition to SHOW mode
      transition(SHOW);
    }
    catch (error) {
      console.log(error);// Handle error
    }
  }

  async function cancel(id) {

    try {
      //transition(CONFIRM);

      transition(SAVING)

      cancelInterview(id);

      transition(EMPTY);

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

    </article>
  )
}