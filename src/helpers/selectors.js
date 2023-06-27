/**
 * Retrieves appointments for a specific day.
 *
 * @param {Object} state - The state object {day, days, appointment} containing appointment and day information.
 * @param {string} day - The name of the day to retrieve appointments for.
 * @returns {Array} - An array of appointments for the specified day.
 */

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

export function getInterview(state, interview) {

  if (!interview) {
    return null
  }
  for (const key in state.interviewers) {
    if (Number(key) === interview.interviewer) {
      return {
        'student': interview.student,
        'interviewer': {
          ...state.interviewers[key]
        }
      }
    }
  }
}