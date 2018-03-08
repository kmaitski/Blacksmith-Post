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
    </div>
  </div>
}
</div>
)
}

}

export default SingleItem;