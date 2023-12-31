import React from "react";
import 'components/InterviewerListItem.scss'
import "components/Button.scss";
import classNames from "classnames";

export default function InterviewerListItem({ name, avatar, selected, setInterviewer }) {

  const interviewer = classNames('interviewers__item', { 'interviewers__item--selected': selected })

  return (
    <li
      className={interviewer}
      onClick={setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}