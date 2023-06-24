import React from "react";
import 'components/InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({ interviewers, onChange, value }) {

  const interviewerList = interviewers.map((i) => {
    return <InterviewerListItem
      key={i.id}
      name={i.name}
      avatar={i.avatar}
      selected={value === i.id}
      setInterviewer={() => onChange(i.id)}
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  )
}