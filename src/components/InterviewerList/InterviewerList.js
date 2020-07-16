import React from "react";
import InterviewerListItem from "components/InterviewerList/InterviewerListItem";
import "components/styles/InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  // Maps through the interviewers prop and returns each individual interviewer
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.value === interviewer.id}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });

  // Returns section populated with all interviewers for the day
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
};

// Sets specific prop types
InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};