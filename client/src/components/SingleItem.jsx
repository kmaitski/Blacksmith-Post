import React from 'react';
import {Component} from 'react';


//single card to display item listing
const SingleItem = ({item}) => (

  <div className="card" style={{flex: 1, minWidth:300, maxWidth:400}}>
    <img className="card-img-top" src={item.image} alt="Card image cap" />
    <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <p className="card-text">{item.description}</p>
    <h6>{item.email}</h6>
    </div>
  </div>

)

window.SingleItem = SingleItem



