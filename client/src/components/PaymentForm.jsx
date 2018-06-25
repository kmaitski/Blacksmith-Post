import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

var stripe = Stripe('pk_test_0xIQ5EzwgXmNg8mcccN854lq');
var elements = stripe.elements();
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  },
  complete: {
    color: '#5ebc01',
    iconColor: '#6ddb00'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
var card = elements.create('card', { style: style });
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});
var form = document.getElementById('payment-form');

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.handleCreditCard = this.handleCreditCard.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    card.unmount('#card-element');
    this.setState({ modalIsOpen: false });
    this.props.close();
  }

  handleCreditCard(e) {
    e.preventDefault();
    var stripehandler = this.props.stripe;
    var seller = this.props.seller;
    var item = this.props.item;
    var cost = this.props.cost;
    var cancel = this.cancel;
    var success = this.props.success;
    stripe.createToken(card).then(result => {
      if (result.error) {
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        stripehandler({
          token: result.token,
          seller: seller,
          item: item,
          cost: cost
        });
        success();
      }
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    card.mount('#card-element');
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.cancel}
          style={style}
          ariaHideApp={false}
          contentLabel="Payment Modal"
        >
          <h2>____________Enter Payment Info____________</h2>
          <form action="/charge" method="post" id="payment-form">
            <p>You are buying: {this.props.item}</p>
            <p> Price: ${this.props.cost} </p>
            <label>Card</label>
            <div id="card-element" />
            <div id="card-errors" role="alert" />
            <button
              onClick={this.handleCreditCard}
              className="btn btn-dark btn-sm"
            >
              Submit
            </button>
            <button onClick={this.cancel} className="btn btn-dark btn-sm">
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
export default PaymentForm;
