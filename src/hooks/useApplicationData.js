import { useEffect, useState } from "react";
import Axios from "axios";
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  //updates the state with the new day.
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const api = {
      getDays: '/api/days',
      getAppointments: '/api/appointments',
      getInterviewers: '/api/interviewers',
    };

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

  //update spots remaining
  const updateSpots = (id, update, mode) => {
    setState(prevState => {
      const days = prevState.days.map(day => {
        if (day.appointments.includes(id)) {
          if (update === "add" && mode !== "EDIT") {
            day.spots--;
          } else if (update === "remove" && mode !== "EDIT") {
            day.spots++;
          }
        }
        return day;
      });

      return { ...prevState, days };
    });
  };

  //change the local state when we book an interview
  function bookInterview(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios
      .put(`/api/appointments/${id}`, {
        interview
      })
      .then(setState({
        ...state,
        appointments
      }))
      .then(() => {
        updateSpots(id, "add", mode)
      })
  }

  function cancelInterview(id, mode) {

    // Create a new state object with updated appointments
    const updatedAppointments = {
      ...state.appointments,
      [id]: {
        ...state.appointments[id], //shallow copies id, time, interview keys.
        interview: null //assigns updated value to interview key.
      }
    }

    return Axios
      .delete(`/api/appointments/${id}`)
      // Update the client state with the new appointments
      .then(setState(prevState => ({
        ...prevState,
        appointments: updatedAppointments
      })))
      .then(updateSpots(id, "remove", mode));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  };
}