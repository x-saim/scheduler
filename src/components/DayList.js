import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, day, setDay }) {

  const data = days.map((e) => {
    return <DayListItem
      key={e.id}
      name={e.name}
      spots={e.spots}
      selected={e.name === day}
      setDay={() => setDay(e.name)} />
  })

  return (
    <ul>
      {data}
    </ul>
  )
}