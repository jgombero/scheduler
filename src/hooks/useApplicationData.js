import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAppointmentsForDay } from 'helpers/selectors';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  
  const setDay = day => setState({ ...state, day });
  

  // Sets state based on get requests from database
  useEffect(() => {
    
    Promise.all([axios.get('/api/days'), (axios.get('/api/appointments')), (axios.get('/api/interviewers'))])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);


  // Makes put request to add new appointment to database
  function bookInterview(id, interview) {
    // Gravs appointment info from state and spreads new interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // Spreads new appointment info into appointments state object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // Puts new appointment into the database
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response => {

      // Updates the new state with correct spots remaining
      const newState = {...state, appointments};
      const updatedSpots = spotsRemaining(newState);

      setState(updatedSpots);
    });
  };

  
  // Makes delete request to delete an appointment from the database
  function cancelInterview(id) {
    // Grabs appointment info from state and sets interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    // Spreads new appointment info into appointments state object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // Deletes old appointment
    return axios.delete(`api/appointments/${id}`, appointment)
    .then(response => {

      // Updates the new state with correct spots remaining
      const newState = {...state, appointments};
      const updatedSpots = spotsRemaining(newState);

      setState(updatedSpots);
    });
  };


  // Returns new state object with updated spots remaining count
  function spotsRemaining(newState) {
    const currentDay = state.days.findIndex(day => state.day === day.name);

    const spots = getAppointmentsForDay(newState, newState.days[currentDay].name);

    const emptyAppointments = spots.filter(appointment => {
      return appointment.interview === null;
    });

    const daysCopy = [...state.days];
    daysCopy[currentDay].spots = emptyAppointments.length;

    return {...newState, days: daysCopy };
  };

  return { state, setDay, bookInterview, cancelInterview };
};


