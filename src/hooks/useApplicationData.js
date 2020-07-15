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
  
  
  useEffect(() => {
    
    Promise.all([axios.get('/api/days'), (axios.get('/api/appointments')), (axios.get('/api/interviewers'))])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);
  
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response => {
      const newState = {...state, appointments};
      const updatedSpots = spotsRemaining(newState);

      setState(updatedSpots);
    });
  };
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`api/appointments/${id}`, appointment)
    .then(response => {
      const newState = {...state, appointments};
      const updatedSpots = spotsRemaining(newState);

      setState(updatedSpots);
    });
  };

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


