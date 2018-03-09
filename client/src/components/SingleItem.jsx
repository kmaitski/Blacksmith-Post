import React from 'react';
import {Component} from 'react';
import PaymentForm from "./PaymentForm.jsx"
import ReactDOM from 'react-dom';

//single card to display item listing
var filterFunc = function(userCat, userSubcat, itemCat, itemSubcat) {
  if (userCat === 'Filter by Category') {
    return true;
  } else if (userCat === itemCat && userSubcat === 'Choose Subcategory') {
    return true;
  } else if (userCat === itemCat && userSubcat === itemSubcat) {
    return true;
  } else {
    return false;
  }
};
class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentFormOpen: false
    }
    this.pay = this.pay.bind(this);
    this.closePayment = this.closePayment.bind(this);
  }

  pay() {
    this.setState({
      paymentFormOpen: true
    })
  }

  closePayment() {
    this.setState({
      paymentFormOpen: false
    })
  }

  render() {
    return (
  // {item.category === filter &&
      <div>
        {/* {(this.props.filter === this.props.item.category || this.props.filter == ('Filter by Category')) && */}
        {filterFunc(this.props.filter, this.props.subfilter, this.props.item.category, this.props.item.subcategory) &&
          <div className="card" style={{flex: 1, minWidth:300, maxWidth:400}}>
            <img className="card-img-top" src={this.props.item.image} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{this.props.item.name}</h5>
              <p className="card-text">{this.props.item.description}</p>
              <h6>{this.props.item.email}</h6>
              <p className="card-price">Asking price: ${this.props.item.cost}</p>
              {this.state.paymentFormOpen &&
              <PaymentForm
                modalIsOpen={this.state.paymentFormOpen}
                close={this.closePayment}
                stripe={this.props.stripe} />}
              {!this.state.paymentFormOpen && <button className="btn btn-dark btn-sm btn-block" onClick={this.pay}>Buy Now</button>}
            </div>
          </div>
        }
      </div>
    )
  }

}

export default SingleItem;
