
import React from 'react';
import {Component} from 'react';


//map through items in state and display as a card deck
var ViewItems = ({items}) => (

  <div className = "card-deck">
    {items.map((item) =>
    <window.SingleItem
    item={item}
    key={item._id} />

    )}

  </div>

);


export default ViewItems;
