import React from 'react'
import Inbox from '../Inbox'
import { useState, useRef } from "react";

function Stopwatch() {
  const intervalRef = useRef(0);
  const [now, setNow] = useState(null);
  const [start, setStart] = useState(null);

  function handleStart() {
    setStart(Date.now());
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setNow(Date.now()), 10);
    console.log(intervalRef.current);
  }

  let timePassed = 0;
  if (now) {
    timePassed = (now-start)/1000;
  }

  function handleStop() {
    console.log(intervalRef.current);
    clearInterval(intervalRef.current);
  }
  return (
    <>
    <h3>{timePassed}</h3>
    <button onClick={handleStart}>Start</button>
    <button onClick={handleStop}>Stop</button>
    </>
  )
}
export default function App() {
  return (
    <Stopwatch/>
  )
}
