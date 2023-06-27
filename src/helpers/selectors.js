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

/*The function should return a new object containing the interview data when we pass it an object that contains the interviewer.

Otherwise, the function should return null. The object it returns should look like this:

{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}

*/
export function getInterview(state, interview) {




}