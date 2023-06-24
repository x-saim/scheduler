import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss'



export default function DayListItem({ spots, selected, setDay, name }) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': (spots === 0)
  })

  const formatSpots = ({ spots }) => {
    let str = spots === 1 ? `${spots} spot` : (spots === 0 ? `no spots` : `${spots} spots`);
    return str;
  }

  return (
    <li className={dayClass}
      onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots({ spots })} remaining</h3>
    </li >
  );
}