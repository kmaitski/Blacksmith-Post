import React from 'react';
import {Component} from 'react';

//single card to display item listing
class SingleItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.filter)
    console.log(this.props.item.category)
    return (
  // {item.category === filter &&
      <div>
        {(this.props.filter === this.props.item.category || this.props.filter == ('Filter by Category')) &&
          <div className="card" style={{flex: 1, minWidth:300, maxWidth:400}}>
            <img className="card-img-top" src={this.props.item.image} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{this.props.item.name}</h5>
              <p className="card-text">{this.props.item.description}</p>
              <h6>{this.props.item.email}</h6>
              <p className="card-price">Asking price: ${this.props.item.cost}</p>
              <div id={this.props.itemID}></div>
              <button className="btn btn-dark btn-sm btn-block" name={this.props.itemID} onClick={this.props.renderwindow}>Buy Now</button>
            </div>
          </div>
        }
      </div>
    )
  }

}

export default SingleItem;