import React from 'react'

const UserInfo = ({ name, age }) => {
  return (
    <div style={cardStyle}>
      <h3>User Information</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ccc",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

export default UserInfo;

