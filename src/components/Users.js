import React from "react";
import UserItem from "./UserItem";

export default function Users({ users }) {
  return (
    <div style={gridStyle}>
      {users.map((user) => (
        <UserItem key={user.id} user={user}></UserItem>
      ))}
    </div>
  );
}
const gridStyle = {
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gridGap: '1rem'
 };