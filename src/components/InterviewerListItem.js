import React from "react";
import 'components/InterviewerListItem.scss'
import "components/Button.scss";

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