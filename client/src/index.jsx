import React from 'react';
import {render} from 'react-dom';
import ItemForm from './components/ItemForm.jsx'
import Footer from './components/Footer.jsx'
import DeleteWeapon from './components/DeleteWeapon.jsx'
import SingleItem from './components/SingleItem.jsx'
import ViewItems from './components/ViewItems.jsx'
import Login from './components/Login.jsx'
import LandingPage from './components/LandingPage.jsx'
import PaymentForm from "./components/PaymentForm.jsx"

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
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
  }

  renderWindow(e) {
    e.preventDefault();
    ReactDOM.render( <PaymentForm stripeTokenHandler={this.stripeTokenHandler}/>, document.getElementById('popup-container'))
  }

  buyItem(){
    this.setState({viewState:'ViewItems'});
  }

  sellItem(){
    this.setState({viewState:'ItemForm'});
  }

  login(){
    this.setState({viewState:'Login'});
  }

  render () {
    return (
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light">
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
                <button className="btn btn-outline-primary btn-lg" onClick={() => this.buyItem()}>Browse</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary btn-lg" onClick={() => this.sellItem()}>Sell</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-info btn-lg" onClick={() => this.login()}>Login</button>
              </li>
            </ul>
          </div>
        </nav>
        {this.state.viewState === 'LandingPage' && <LandingPage />}
        {this.state.viewState === 'ItemForm' && <ItemForm />}
        {this.state.viewState === 'ViewItems' && <ViewItems renderWindow={this.renderWindow} items={this.state.items} />}
        {this.state.viewState === 'Login' && <Login/>}
        <Footer />
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