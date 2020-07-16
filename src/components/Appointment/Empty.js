import React from 'react';

export default function Empty(props) {

  // Returns an unbooked appointment slot. User can click add button to access "Form" page
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};