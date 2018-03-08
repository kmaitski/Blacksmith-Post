import React from 'react';

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
  }
};
var card = elements.create('card', {style: style});
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
    this.handleCreditCard = this.handleCreditCard.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    card.mount('#card-element');
  }

  cancel() {
    card.unmount('#card-element');
    this.props.cancel()
  }

  handleCreditCard(e) {
    e.preventDefault();
    stripe.createToken(card).then((result) => {
      if (result.error) {
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        this.props.stripeTokenHandler(result.token);
      }
    });
  }

  render() {
    return(
      <form action="/charge" method="post" id="payment-form">
           <label>Card</label>
           <div id="card-element"></div>
           <div id="card-errors" role="alert"></div>
           <button onClick={this.handleCreditCard} className="btn btn-dark btn-sm" >Submit</button>
           <button onClick={this.cancel} className="btn btn-dark btn-sm" >Cancel</button>
         </form>
         )
  }

}
export default PaymentForm;