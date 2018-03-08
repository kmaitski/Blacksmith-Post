import React from 'react';
import {Component} from 'react';

//single card to display item listing
const SingleItem = (props) => (

  <div className="card" style={{flex: 1, minWidth:300, maxWidth:400}}>
    <img className="card-img-top" src={props.item.image} alt="Card image cap" />
    <div className="card-body">
    <h5 className="card-title">{props.item.name}</h5>
    <p className="card-text">{props.item.description}</p>
    <h6>{props.item.email}</h6>
    <button onClick={props.renderWindow}>Buy Now</button>
    </div>
  </div>

)

export default SingleItem;
