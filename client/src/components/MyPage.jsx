import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: [],
      soldItems: [],
      boughtItems: [],
      ratings: []
    }

  }

  componentDidMount() {
    let thisUser = {username: this.props.user.local.username};
    $.get('/userSells', thisUser, (data) => {
      this.setState({soldItem: data.sells});
    })
    $.get('/userBuys', thisUser, (data) => {
      this.setState({boughtItems: data.buys});
    })
    $.get('/userCurrentItems', thisUser, (data) => {
      this.setState({currentItems: data.currentItems});
    })
  }

  render() {
    console.log(this.props.user);
    return (
       <div>
        <div className="jumbotron">
          <h1 className="display-4 text-white">{this.props.user.local.username}</h1>
          <div className="card-deck">
            <div className="card text-white bg-dark mb-3">
              <h4 className="card-title">Currently Listed Items</h4>
              {!this.state.currentItems.length && <div>None so far . . .</div>}
              {this.state.currentItems &&
                this.state.currentItems.map((item) => <div>{item.name}</div>)
              }
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title">Sold items</h4>
              {!this.state.soldItems.length && <div>None so far . . .</div>}
              {this.state.soldItems &&
                this.state.soldItems.map((item) => <div>Sold: {item.item}</div>)
              }
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title">Purchased items</h4>
              {!this.state.boughtItems.length && <div>None so far . . .</div>}
              {this.state.boughtItems &&
                this.state.boughtItems.map((item) => <div>Bought: {item.item}</div>)
              }
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title">My Feedback</h4>
              {!this.state.ratings.length && <div>None so far . . .</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MyPage;
