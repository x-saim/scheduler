import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointment = dailyAppointments.map((a) => {
    return <Appointment key={a.id} {...a} /> //Spreading every key in the appointment object to become props for a component
  })

  //updates the state with the new day.
  const setDay = day => setState({ ...state, day });

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
        .get(api.getAppointments)])
      .then((all) => {
        setState((prev) => ({
          ...prev, days: all[0].data, appointments: all[1].data
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
        {appointment}
        <Appointment key={"last"} time={"5pm"} />
      </section>

    </main>
  );
}
