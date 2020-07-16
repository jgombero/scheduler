// Returns an array of appointments for the specified day
export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.filter(eachDay => {
    return eachDay.name === day;
  });

  if (filteredDays.length === 0) {
    return [];
  }

  const dayAppointments = filteredDays[0].appointments;

  const appointments = dayAppointments.map(appointment => {
    return state.appointments[appointment];
  });

  return appointments;
};


// Returns an array of interviewers for the specified day
export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.filter(eachDay => {
    return eachDay.name === day;
  });

  if (filteredDays.length === 0) {
    return [];
  }

  const dayInterviewers = filteredDays[0].interviewers;

  const interviewers = dayInterviewers.map(interviewer => {
    return state.interviewers[interviewer];
  });

  return interviewers;
};


// Returns an object containing the data for a specified interview
export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewData = {...state.interviewers[interview.interviewer]};

  return {...interview, interviewer: interviewData};
};
