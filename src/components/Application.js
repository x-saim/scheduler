import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application() {
  //state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const interviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //change the local state when we book an interview
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log(appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log(appointments)

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

  }
  //console.log(state)


  function cancelInterview(id) {
    console.log(state.appointments)
    // Create a new state object with updated appointments
    const updatedAppointments = {
      ...state.appointments,
      [id]: {
        ...state.appointments[id], //shallow copies id, time, interview keys.
        interview: null //assigns updated value to interview key.
      }
    }
    console.log(updatedAppointments)

    // Update the state with the new appointments
    setState(
      {
        ...state,
        appointments: updatedAppointments
      });
  }



  // const appointment = {
  //   ...state.appointments[id],
  //   interview: { ...interview }
  // };

  // const appointments = {
  //   ...state.appointments,
  //   [id]: appointment
  // };



  // Axios
  //   .put(`http://localhost:8001/api/appointments/${id}`, {
  //     interview
  //   })
  //   .then(response => {
  //     console.log(response)
  //   })
  //   .then(setState({
  //     ...state,
  //     appointments
  //   }))




  //     appointments[appointment]["interview"] = null;
  //   }
  // }
  //console.log(id, appointments);

  //setting up Appointment component props
  const schedule = dailyAppointments.map((a) => {
    const interview = getInterview(state, a.interview);

    return <Appointment
      key={a.id}
      id={a.id}
      time={a.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      appointments={state.appointments}
    />
  })

  //updates the state with the new day.
  const setDay = day => setState({ ...state, day });



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


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment
          key={"last"}
          time={"5pm"}
        />
      </section>

    </main>
  );
}