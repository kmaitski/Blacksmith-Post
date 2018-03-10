import React from 'react';
import $ from 'jquery';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: [],
      soldItems: [],
      boughtItems: []
    }
  }

  componentWillMount() {
    let thisUser = {username: this.props.user.local.username};
    $.get('/userSells', thisUser, function(err, data) {
      if (err) { console.log(err) }
      console.log(data);
    })
    $.get('/userBuys', thisUser, function(err, data) {
      if (err) { console.log(err) }
      console.log(data);
    })
    $.get('/userCurrentItems', thisUser, function(err, data) {
      if (err) { console.log(err) }
      console.log(data);
    })
  }

  render() {
    return (
      <div style={{paddingTop: "5%"}}>
        <div className="container">{this.props.user.local.username}
        </div>
      </div>
    )
  }
}
export default MyPage;
