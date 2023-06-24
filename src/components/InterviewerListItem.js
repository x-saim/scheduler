import React from "react";

export default function InterviewerListItem({ id, name, avatar, selected, setInterviewer }) {
  // const interviewer = {
  //   id: 1,
  //   name: "Sylvia Palmer",
  //   avatar: "https://i.imgur.com/LpaY82x.png"
  // };



  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  )
}