import { useEffect, useState } from "react";
import Axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  //state.days[element]['appointments'].includes(id)
  //updates the state with the new day.
  const setDay = day => setState({ ...state, day });

  //update spots remaining
  const updateSpots = (id, update) => {
    console.log(state)

    for (const element of state.days) {
      console.log(element);
      if (element && element.appointments && element.appointments.includes(id)
      )
        if (update === "add") {
          element.spots -= 1;
        } else if (update === "remove") {
          element.spots += 1;
        }
    }
    return state;
  }


  //change the local state when we book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    Axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview
      })
      .then(response => {
        console.log(response)

      })
      .then(setState({
        ...state,
        appointments
      }))
      .then(updateSpots(id, "add"));

  }

  function cancelInterview(id) {

    // Create a new state object with updated appointments
    const updatedAppointments = {
      ...state.appointments,
      [id]: {
        ...state.appointments[id], //shallow copies id, time, interview keys.
        interview: null //assigns updated value to interview key.
      }
    }

    Axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        console.log(response)
      })
      // Update the client state with the new appointments
      .then(setState(prevState => ({
        ...prevState,
        appointments: updatedAppointments
      })))
      .then(updateSpots(id, "remove"));
  }

  //api routes
  const api = {
    getDays: 'http://localhost:8001/api/days',
    getAppointments: 'http://localhost:8001/api/appointments',
    getInterviewers: 'http://localhost:8001/api/interviewers',
  };

  useEffect(() => {

    Promise.all([
      Axios
        .get(api.getDays),
      Axios
        .get(api.getAppointments),
      Axios.get(api.getInterviewers)])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })

  }, [])


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  };
}