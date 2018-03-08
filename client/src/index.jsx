import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import ItemForm from './components/ItemForm.jsx'
import Footer from './components/Footer.jsx'
import DeleteWeapon from './components/DeleteWeapon.jsx'
import SingleItem from './components/SingleItem.jsx'
import ViewItems from './components/ViewItems.jsx'
import Login from './components/Login.jsx'
import LandingPage from './components/LandingPage.jsx'
import PaymentForm from "./components/PaymentForm.jsx"
import SignUp from './components/SignUp.jsx';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isLoggedIn: false,
      items:[],
      deleteitem:'',
      viewState:'LandingPage',
      isLoading:false,
    }

    this.renderWindow = this.renderWindow.bind(this)
    this.stripeTokenHandler = this.stripeTokenHandler.bind(this)
  }

    componentDidMount(){
    this.setState({isLoading: true});

    fetch('/api/items')
    .then(response => response.json())
    .then(data => this.setState({ items: data, isloading:false}));
  }

   goHome(){
    this.setState({viewState:'LandingPage'});
  }

  stripeTokenHandler(token) {
    console.log(token);
    console.log('credit card success!');
    $.ajax({
      url: '/charge',
      type: 'POST',
      data: token,
      success: function(data) {
        console.log("Charge successs! ", data)
      },
      error: function(err){
        console.log('errror in ajax', err);
      }
    });
  }

  renderWindow(e) {
    e.preventDefault();
    console.log(e.target.name)
    ReactDOM.render( <PaymentForm stripeTokenHandler={this.stripeTokenHandler}/>, document.getElementById(e.target.name))
  }

  buyItem(){
    this.setState({viewState:'ViewItems'});
  }

  sellItem(){ //redirect to login if not logged in when clicking sell
    // if (this.state.isLoggedIn) {
      this.setState({viewState:'ItemForm'});
    // } else {
    //   this.setState({viewState:'Login'})
    // }
  }

  login(){
    this.setState({viewState:'Login'});
  }

  render () {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="#"></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button className="btn btn-link" onClick={() => this.goHome()}>Home</button>
              </li>
              <li className="nav-item active">
                <button className="btn btn-link" onClick={() => this.buyItem()}>Browse</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link " onClick={() => this.sellItem()}>Sell</button>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.state.isLoggedIn === false &&
              <li className="nav-item">
                <button className="btn btn-link" onClick={() => this.login()}>Login</button>
              </li>
              }
              {this.state.isLoggedIn === true &&
              <li className="nav-item">
                <button className="btn btn-link" onClick={() => this.logout()}>Logout</button>
              </li>
              }
            </ul>
          </div>
        </nav>
        <div style={{paddingTop: "51px"}}>
          {this.state.viewState === 'LandingPage' && <LandingPage />}
          {this.state.viewState === 'ItemForm' && <ItemForm />}
          {/* conditional rendering of buttons based on this.state.isLoggedIn */}
          {this.state.viewState === 'ViewItems' && <ViewItems renderwindow={this.renderWindow} items={this.state.items} />}
          {this.state.viewState === 'Login' && this.state.isLoggedIn === false && <SignUp />}
          <Footer />
        </div>
      </div>
    );
  };
};


// set up header
// set up footer
//set up router
//duplicate armor post
//set up view many item page weapon / armor
// set up single view item page weapon /armor
//setup basic login page.

//should all ajax requests be index page can they be on components?





ReactDOM.render(<App/>, document.getElementById('app'));

//routers
//conditinal rendering ,
