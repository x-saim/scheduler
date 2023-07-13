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
import Error from "./Error";

//Constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"


export default function Appointment({ time, interview, interviewers, bookInterview, id, cancelInterview }) {
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };


    // Determine the mode based on the current mode value

    //const mode = mode === EDIT ? EDIT : CREATE;
    console.log(mode);
    // Use the transition function to update the mode to "SAVING"
    transition(SAVING);

    //waiting for the asynchronous PUT request to complete
    try {
      await bookInterview(id, interview, mode);
      // // Transition to SHOW mode after saving
      transition(SHOW);
    }
    catch (error) {
      //When we transition to the ERROR_SAVE mode from the SAVING mode, we need to replace the SAVING mode in the history.
      transition(ERROR_SAVE, true);
    }
  }

  const cancel = async (id) => {
    // Use the transition function to update the mode to "DELETE"
    transition(DELETE, true);

    try {
      await cancelInterview(id);
      transition(EMPTY);
    } catch (error) {
      //When we transition to the ERROR_DELETE mode from the DELETE mode, we need to replace the DELETE mode in the history.
      transition(ERROR_DELETE, true);

    }
  };

  return (
    <article className="appointment"
      data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
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
          message={`Saving`} />}
      {mode === CONFIRM &&
        <Confirm
          message={'Are you sure you want to delete?'}
          onCancel={() => transition(SHOW)}
          onConfirm={() => cancel(id)} />}

      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === EDIT &&
        <Form
          interviewers={interviewers}
          name={interview.student}
          interviewer={interview.interviewer.id}
          onSave={save}

          onCancel={() => transition(SHOW)}
        />}

      {mode === ERROR_DELETE && (
        <Error message="Error: Failed to delete" onClose={() => back()} />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Error saving appointment" onClose={() => back()} />
      )}


    </article>
  )
}