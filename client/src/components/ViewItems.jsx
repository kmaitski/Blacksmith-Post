
import React from 'react';
import {Component} from 'react';
import SingleItem from './SingleItem.jsx'

//map through items in state and display as a card deck
var ViewItems = (props) => (

  <div className = "card-deck">
    {props.items.map((item) =>
    <SingleItem
    renderWindow={props.renderWindow}
    item={item}
    itemID={item._id}
    key={item._id} />
    )}

  </div>

);


export default ViewItems;
