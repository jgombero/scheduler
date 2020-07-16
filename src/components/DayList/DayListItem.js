import React from "react";
import classNames from 'classnames';

import "components/styles/DayListItem.scss";

// Conditionally sets spots remaining text for none, one, or many spots
const formatSpots = (spotsRemaining) => {
  if (spotsRemaining === 0) {
    return 'no spots remaining';
  } else if (spotsRemaining === 1) {
    return '1 spot remaining';
  } else if (spotsRemaining > 1) {
    return `${spotsRemaining} spots remaining`;
  }
}


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  // Returns each day of the week and how many interview spots are remaining
  return (
    <li 
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}