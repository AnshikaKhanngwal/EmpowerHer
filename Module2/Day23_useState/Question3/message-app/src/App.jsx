import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MessageCard from "./MessageCard";
function App() {
  
  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <MessageCard
        title="Welcome"
        message="Welcome to the React Props assignment."
      />

      <MessageCard
        title="Reminder"
        message="Practice React daily to improve your skills."
      />

      <MessageCard
        title="Motivation"
        message="Small steps every day lead to big results."
      />

      <MessageCard
        title="Success"
        message="You have successfully created reusable components!"
      />
    </div>
  );
}

export default App
