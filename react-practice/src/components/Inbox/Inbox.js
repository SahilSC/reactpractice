import React, { useState } from "react";
import { letters } from "./data";


function Letter({ id, subject, isStarred, check}) {
  
  return (
    <>
    <li style={(isStarred ? {
        backgroundColor: "lightblue",
        borderRadius: "25px"
      } : null)}>
      <label >
        <input type="checkbox" checked={isStarred} onChange={() => check(id)}></input> {subject}
      </label>
      
    </li>
    <br/>
    </>
    
  );
}

export default function Inbox() {
    const [inbox, setInbox] = useState(letters);
    const numChecked = inbox.filter(letter => letter.isStarred).length;
    
    function handleCheck(id) {
        setInbox(inbox.map(letter => {
            if (letter.id === id) {
                letter.isStarred = !letter.isStarred;
            }
            return letter;
        }))
    }
  return (
    <>
      <h1>Inbox</h1>
      <ul>
        {inbox.map(letter => {
            return <Letter key = {letter.id} {...letter} check={handleCheck}/>;
        })}
      </ul>
      <hr />
      <strong>You have selected {numChecked} items.</strong>
    </>
  );
}
