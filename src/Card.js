import React from 'react';
import './Card.css'
function Card({ ticket, users }) {
  // Find the user based on the userId from the users array
  const user = users.find(user => user.id === ticket.userId);

  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>User: {user ? user.name : 'No User'}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
}

export default Card;
