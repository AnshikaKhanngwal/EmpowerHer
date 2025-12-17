import React from 'react'
import UserInfo from "./UserInfo";


function UserProfile() {
  const name = "Anshika";
  const age = 21;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>User Profile</h2>
      <UserInfo name={name} age={age} />
    </div>
  );
}

export default UserProfile;

