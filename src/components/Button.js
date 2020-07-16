import React from "react";
import classNames from 'classnames';

import "components/Button.scss";

export default function Button(props) {
  // Either adds the danger or confirm css class to the button
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });

   // Returns the button with the appropriate class
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }
