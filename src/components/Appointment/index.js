import React from 'react';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


export default function Appointment(props) {

  // Constants for different modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Grabs the mode changing functions from the useVisualMode Hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Function to save a new or edited appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // Transitions to the "Status" page with "saving" text
    transition(SAVING);
    // Books the interview with the passed information
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  // Function to confirm the users intentions for destructive actions
  function confirm() {
    // Transitions to the "Status" page with "deleting" text
    transition(DELETING, true);
    // Deletes the selected interview
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  };

  // Directs to Confirm page when user attempts destructive actions
  function onDelete() {
    transition(CONFIRM);
  };

  // Directs to the Form page, populated with current information to edit existing appointment
  function edit() {
    transition(EDIT);
  }

  // Conditionally renders components based on mode
  return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={onDelete}
        onEdit={edit}
      />
    )}
    {mode === CREATE && (
      <Form 
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save}
      />
    )}
    {mode === EDIT && (
      <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
      />
    )}
    {mode === SAVING && (
      <Status message='Saving'/>
    )}
    {mode === DELETING && (
      <Status message="Deleting" />
    )}
    {mode === CONFIRM && (
      <Confirm 
      message="Are you sure you would like to delete?"
      onCancel={() => back()}
      onConfirm={confirm}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error 
        message="Could not save appointment"
        onClose={() => back()}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error 
        message="Could not delete appointment"
        onClose={() => back()}
      />
    )}
  </article>
  );
};
