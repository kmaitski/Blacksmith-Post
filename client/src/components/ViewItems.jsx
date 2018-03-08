
import React from 'react';
import {Component} from 'react';
import SingleItem from './SingleItem.jsx';


//map through items in state and display as a card deck
class ViewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }
  handleCategoryChange(e){}
  render() {
    return (
      <div>

        <div className = "card-deck">
          {this.state.items.map((item) =>
          <SingleItem
          item={item}
          key={item._id} />

          )}

        </div>
      </div>
    )
  }
}


export default ViewItems;
