import React from 'react'

const MessageCard = ({ title, message }) => {
  return (
   
      <div style={cardStyle}>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
    
  )
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "12px",
  backgroundColor: "#f9f9f9",
};


export default MessageCard
