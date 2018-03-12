import React from 'react';

const UserEntry = props => (
  <div style={{border: "solid", height: "100%"}}>
    <img
      src={props.item.image}
      style={{height: "185px", width: "100%"}}
    />
    <h6>{props.item.name}</h6>
    <p>${props.item.cost}</p>
  </div>
)

export default UserEntry;