import React from "react";
import classNames from 'classnames';

import "components/DayList/styles/DayListItem.scss";


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  
  let spotsIsPlural = props.spots !== 1;  // Whether to use "Spots" or "Spot"
  let spotsAmount = props.spots === 0 ? "no" : props.spots;  // Whether to use a number or "No"
  let spotsString = `${spotsAmount} ${spotsIsPlural ? "spots" : "spot"} remaining`; // Builds spots string
  
  // Returns each day of the week and how many interview spots are remaining
  return (
    <li 
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsString}</h3>
    </li>
  );
}