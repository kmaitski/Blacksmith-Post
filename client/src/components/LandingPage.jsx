import React from 'react';
import {Component} from 'react';

const LandingPage = (props) => (
  <div className="jumbotron">
    <h3 className="display-1">Blacksmith Post</h3>
    <h4 className="sub">A relic of the past may be a treasure of the future</h4>
    <a className="btn btn-light" onClick={props.buyclick} role="button">Browse Items</a><a className="btn btn-light" onClick={props.sellclick} role="button">Sell Items</a>
  </div>
 )

export default LandingPage