import React from 'react';

const FeedBackEntry = props => (
  <div style={{ border: "solid", height: "100%", padding: "10px", width: "100%" }}>
    <p>{props.item.message}</p>
    <p><em>{props.item.user}</em></p>
    <p>{props.item.date}</p>
  </div>
)

export default FeedBackEntry;