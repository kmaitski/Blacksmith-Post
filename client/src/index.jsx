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
import SignUp from './components/SignUp.jsx';
import ImageUploader from './components/ImageUploader.jsx';
import LoginModal from './components/LoginModal.jsx';


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      loginModalOpen: false,
      isLoggedIn: false,
      items:[],
      deleteitem:'',
      viewState:'LandingPage',
      isLoading:false,
      currentUser: false
    }
    this.fetch = this.fetch.bind(this);
    this.itemBought = this.itemBought.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.sellItem = this.sellItem.bind(this);
    this.stripeTokenHandler = this.stripeTokenHandler.bind(this);
    this.handleNewSession = this.handleNewSession.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

    componentDidMount(){
    this.setState({isLoading: true});

    fetch('/api/items')
    .then(response => response.json())
    .then(data => this.setState({ items: data, isloading:false}));
  }


  fetch() {
    this.setState({
      isLoading: true,
      viewState: 'LandingPage'});
    fetch('/api/items')
    .then(response => response.json())
    .then(data => this.setState({ items: data, isloading:false}));

  }

   goHome(){
    this.setState({viewState:'LandingPage'});
  }

  itemBought(item) {
    $.ajax({
      url: '/api/deleteItem',
      type: 'POST',
      data: item,
      success: function(data) {
        console.log("Item removed from database! ", data)
      },
      error: function(err){
        console.log('errror in ajax', err);
      }
    });
    fetch('/api/items')
      .then(response => response.json())
      .then(data => this.setState({ items: data, isloading:false}));
  }

  stripeTokenHandler(data) {
    console.log('credit card success!');
    var user = this.state.currentUser
    $.ajax({
      url: '/charge',
      type: 'POST',
      data: {'data': data, 'user': user},
      success: function(data) {
        console.log("Charge successs! ", data)
      },
      error: function(err){
        console.log('errror in ajax', err);
      }
    });
  }

  handleNewSession(user) {
    this.setState({isLoggedIn: true})
    this.setState({currentUser: user})
  }

  closeLogin() {
    this.setState({loginModalOpen: false});
  }

  buyItem(){
    this.setState({viewState:'ViewItems'});
  }

  sellItem(){ //redirect to login if not logged in when clicking sell
     if (this.state.isLoggedIn) {
      this.setState({viewState:'ItemForm'});
     } else {
       this.setState({loginModalOpen: true})
     }
  }

  login(){
    this.setState({loginModalOpen: true});
    // this.setState({viewState:'Login'});
  }
  logout() {
    $.get('/logout')
    this.setState({
      isLoggedIn: false,
      currentUser: false,
      viewState: 'LandingPage'
    })
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
          {this.state.viewState === 'LandingPage' && <LandingPage buyclick={this.buyItem} sellclick={this.sellItem}/>}
          {this.state.viewState === 'ItemForm' && <ItemForm user={this.state.currentUser.local.username} fetch={this.fetch} />}
          {/* conditional rendering of buttons based on this.state.isLoggedIn */}
          {this.state.viewState === 'ViewItems' && <ViewItems login={this.login} isLoggedIn={this.state.isLoggedIn} itembought={this.itemBought} stripe={this.stripeTokenHandler} items={this.state.items} />}
          {this.state.isLoggedIn === false && <LoginModal setCurrentUser={this.handleNewSession} modalIsOpen={this.state.loginModalOpen} close={this.closeLogin} />}
          {this.state.viewState === 'upload' && <ImageUploader />}
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
