import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: [],
      soldItems: [],
      boughtItems: []
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
    return (
      <div style={{paddingTop: "5%"}}>
        <div className="container">{this.props.user.local.username}
          <div className="container">
          {this.state.currentItems &&
            this.state.currentItems.map((item) => <div>Currently Listed: {item.name}</div>)
          }
          {this.state.soldItems &&
            this.state.soldItems.map((item) => <div>Sold: {item.item}</div>)
          }
          {this.state.boughtItems &&
            this.state.boughtItems.map((item) => <div>Bought: {item.item}</div>)
          }
          </div>
        </div>
      </div>
    )
  }
}
export default MyPage;
