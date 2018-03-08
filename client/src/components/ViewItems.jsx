
import React from 'react';
import {Component} from 'react';
import SingleItem from './SingleItem.jsx';


//map through items in state and display as a card deck
class ViewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      category: undefined,
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }
  handleCategoryChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <label><h5>Condition:</h5></label>
            <select className="form-control" name="category"
              value={this.state.category}
              onChange={e => this.handleCategoryChange(e)}>
              <option>Filter by Category</option>
              <option>Weapon</option>
              <option>Armor</option>
            </select>
        </div>
        <div className = "card-deck">
          {this.state.items.map((item) =>

          <SingleItem
          stripetokenhandler={this.props.stripetokenhandler}
          item={item}
          key={item._id}
          itemID={item._id}
          filter={this.state.category} />
          )}
        </div>
      </div>
    )
  }
}


export default ViewItems;
