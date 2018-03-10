import React from 'react';
import {Component} from 'react';
import Receipt from "./Receipt.jsx"
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
      paymentFormOpen: false,
      showReceipt: false,
      itemBought: false
    }
    this.pay = this.pay.bind(this);
    this.renderSuccess = this.renderSuccess.bind(this);
    this.closePayment = this.closePayment.bind(this);
    this.closeReceipt = this.closeReceipt.bind(this);
  }

  pay() {
    if (this.props.isLoggedIn) {
      this.setState({
        paymentFormOpen: true
      })
    } else {
      this.props.login()
    }
  }

  closePayment() {
    this.setState({
      paymentFormOpen: false
    })
  }

  closeReceipt() {
    this.setState({
      showReceipt: false
    })
  }

  renderSuccess() {
    this.props.itembought(this.props.item);
    this.setState({
      paymentFormOpen: false,
      itemBought: true,
      showReceipt: true
    })
  }

  render() {
    return (
  // {item.category === filter &&
      <div>
        {/* {(this.props.filter === this.props.item.category || this.props.filter == ('Filter by Category')) && */}
        {filterFunc(this.props.filter, this.props.subfilter, this.props.item.category, this.props.item.subcategory) &&
          <div className="card text-center" style={{flex: 1, width: 360}}>
            <img className="card-img-top" src={this.props.item.image} alt="Card image cap" />
            <div className="card-body">
              <div className="card-header">
                <h5 className="card-title">{this.props.item.name + ' '}
                  {this.props.item.condition === "Pristine" && <span className="badge badge-primary">{this.props.item.condition}</span>}
                  {this.props.item.condition === "Good" && <span className="badge badge-info">{this.props.item.condition}</span>}
                  {this.props.item.condition === "Fair" && <span className="badge badge-success">{this.props.item.condition}</span>}
                  {this.props.item.condition === "Terrible" && <span className="badge badge-danger">{this.props.item.condition}</span>}
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{this.props.item.description}</li>
                <li className="list-group-item">{this.props.item.email}</li>
                <li className="list-group-item">Asking price: ${this.props.item.cost}</li>
              </ul>
              {this.state.paymentFormOpen &&
              <PaymentForm
                seller={this.props.item.email}
                item={this.props.item.name}
                cost={this.props.item.cost}
                modalIsOpen={this.state.paymentFormOpen}
                success={this.renderSuccess}
                close={this.closePayment}
                stripe={this.props.stripe} />}
              {this.state.showReceipt &&
              <Receipt
                modalIsOpen={this.state.showReceipt}
                itemname={this.props.item.name}
                price={this.props.item.cost}
                image={this.props.item.image}
                owner={this.props.item.blacksmith}
                close={this.closeReceipt} />}
              {!this.state.paymentFormOpen && !this.state.itemBought && <button className="btn btn-dark btn-sm btn-block" onClick={this.pay}>Buy Now</button>}
              {this.state.itemBought && <button className="btn btn-red btn-sm btn-block" disabled>Item purchased</button>}
            </div>
          </div>
        }
      </div>
    )
  }

}

export default SingleItem;
