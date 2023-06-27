export function getAppointmentsForDay(state, day) {
  const arr = [];

  for (const e of state.days) {
    if (e.name === day) {

      if (!e.appointments) {
        return [];
      }

      for (const element of e.appointments) {
        for (const key in state.appointments) {
          if (Number(key) === element) {
            arr.push(state.appointments[element])
          }

        }
      }

    }
  }

  return arr
}

