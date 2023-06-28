import React from "react";
import 'components/InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({ interviewers, onChange, value }) {

  let interviewerList;

  if (interviewers) {
    interviewerList = interviewers.map((i) => {
      return <InterviewerListItem
        key={i.id}
        name={i.name}
        avatar={i.avatar}
        selected={value === i.id}
        setInterviewer={() => onChange(i.id)}
      />
    })
  }
  console.log(interviewerList)




  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  )
}