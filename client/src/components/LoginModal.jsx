import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import $ from 'jquery';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      signUpView: false,
      email:'',
      password:''
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUpView = this.handleSignUpView.bind(this);
  }

  handleSignUpView() {
    this.setState({signUpView: !this.state.signUpView})
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    console.log('in handleSubmit');
    var newUser = {username: this.state.email, password: this.state.password};
    $.post('/login', newUser, () =>
      console.log('user ' + newUser + ' created'));
  }

  handleSignUpSubmit(e) {
    e.preventDefault();
    console.log('in handleSubmit');
    var newUser = {username: this.state.email, password: this.state.password};
    $.post('/signup', newUser, () =>
      console.log('user ' + newUser + ' created'));
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({signUpView: false})
    this.setState({modalIsOpen: false});
    this.props.close();
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Login Modal"
        >
{this.state.signUpView === false &&
<div>
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={this.closeModal}>X</button>
          <div>
        <form onSubmit={this.handleLoginSubmit}>
          <h1>Login</h1>
          <label>Enter your email here</label>
          <input
            type='text'
            onChange={this.handleEmailChange}
          />
          <label>Enter your password here</label>
          <input
            type='text'
            onChange={this.handlePasswordChange}
          />
          <button type='submit'>Log in</button>
          <div>No account? <button onClick={this.handleSignUpView} >Sign up</button></div>
        </form>
      </div>
      </div>
}
{this.state.signUpView &&
  <div>
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={this.closeModal}>X</button>
          <div>
        <form onSubmit={this.handleSignUpSubmit}>
          <h1>Sign up</h1>
          <label>Enter your email here</label>
          <input
            type='text'
            onChange={this.handleEmailChange}
          />
          <label>Enter your password here</label>
          <input
            type='text'
            onChange={this.handlePasswordChange}
          />
          <button type='submit'>Sign up</button>
          <div>Already have Account? <button onClick={this.handleSignUpView} >Log in</button></div>
        </form>
      </div>
      </div>
}
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
