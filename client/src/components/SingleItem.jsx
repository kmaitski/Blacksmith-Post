import React from 'react';
import {Component} from 'react';
import PaymentForm from "./PaymentForm.jsx"

//single card to display item listing
class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentForm: false
    }
    this.renderWindow = this.renderWindow.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  renderWindow(e) {
    e.preventDefault();
    this.setState({
      paymentForm: true
    })
  }

  cancel() {
    this.setState({
      paymentForm: false
    })
  }

  render() {
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
              {this.state.paymentForm && <PaymentForm cancel={this.cancel} stripeTokenHandler={this.props.stripetokenhandler} />}
              {!this.state.paymentForm && <button className="btn btn-dark btn-sm btn-block" onClick={this.renderWindow}>Buy Now</button>}
            </div>
          </div>
        }
      </div>
    )
  }

}

export default SingleItem;