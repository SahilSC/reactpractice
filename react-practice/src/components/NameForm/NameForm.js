import React, { useState } from "react";

let initialName = {
    first: "John",
    last: "Deere"
}

export default function NameForm() {
  const [name, setName] = useState(initialName)
  const [edit, setEdit] = useState(false);

  function handleText(e, info) {
    setName({
        ...name,
        [info]: e.target.value
    })
  }

  function handleSubmit() {
    setEdit(!edit);
  }

  return (
    <>
      <label>
        First Name: {' '}
        {edit ? (
          <input
            id="first-name"
            name="first-name"
            type="text"
            value={name.first}
            onChange={e => {handleText(e, "first")}}
          ></input>
        ) : (
          <strong>{name.first}</strong>
        )}
      </label>
      <br/>
      <label>
        Last Name: {' '}
        {edit ? (
          <input
            id="last-name"
            name="last-name"
            type="text"
            value={name.last}
            onChange={e => {handleText(e, "last")}}
          ></input>
        ) : (
          <strong>{name.last}</strong>
        )}
      </label>
      <br />
      <br />
      <button type="submit" onClick={handleSubmit}>{edit ? "Save" : "Edit"} Form</button>
      <br />
      <p>Hello <em>{name.first + " " + name.last}!</em></p>
    </>
  );
}
