import React from "react";
import 'components/InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({ interviewers, setInterviewer, interviewer }) {

  const interviewerList = interviewers.map((e) => {
    return <InterviewerListItem
      key={e.id}
      name={e.name}
      avatar={e.avatar}
      setInterviewer={() => setInterviewer(e.id)}
      selected={interviewer === e.id}

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