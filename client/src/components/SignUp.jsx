import React from 'react';
import $ from 'jquery';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('in handleSubmit');
    var newUser = { username: this.state.email, password: this.state.password };
    $.post('/login', newUser, () =>
      console.log('user ' + newUser + ' created')
    );
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Please Sign Up</h1>
          <label>Enter your email here</label>
          <input type="text" onChange={this.handleEmailChange} />
          <label>Enter your password here</label>
          <input type="text" onChange={this.handlePasswordChange} />
          <button type="submit" />
        </form>
      </div>
    );
  }
}

export default SignUp;
