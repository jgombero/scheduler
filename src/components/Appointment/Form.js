import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.student || props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Resets the form to have no input
  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  // Cancels the form submission
  const cancel = function() {
    reset();
    props.onCancel();
  };

  // Verifies the user entered a name
  function validate() {
    if (name === '') {
      setError("Student name cannot be blank");
      return;

    }

    setError("");
    props.onSave(name, interviewer);
  }

  // Returns the main form for users to input values to book an appointment
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            value={name}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={event => cancel()}>Cancel</Button>
          <Button confirm onClick={event => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
};