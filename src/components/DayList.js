import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {

  const data = days.map((d) => {
    return <DayListItem
      key={d.id}
      name={d.name}
      spots={d.spots}
      selected={d.name === value}
      setDay={onChange} />
  })

  return (
    <ul>
      {data}
    </ul>
  )
}

//() => setDay(e.name)