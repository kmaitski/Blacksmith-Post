import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: [],
      soldItems: [],
      boughtItems: [],
      feedbackSent: false
    }

    this.feedback = this.feedback.bind(this);
  }

  componentDidMount() {
    let thisUser = {username: this.props.user};
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

  feedback() {
    this.setState({
      feedbackSent: true
    })
    this.props.feedback(this.props.user)
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4 text-white">{this.props.user}    <button onClick={this.props.goback} className="btn btw-white align-right">Back</button></h1>
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
                this.state.soldItems.map((item) => <div>{item.item}</div>)
              }
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title">Purchased items</h4>
              {!this.state.boughtItems.length && <div>None so far . . .</div>}
              {this.state.boughtItems &&
                this.state.boughtItems.map((item) => <div>{item.item}</div>)
              }
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title"> Give Feedback</h4>
              <p>Review</p>
              <textarea className="user-feedback"></textarea>
              <p>Rating</p>
              <select className="user-review">
                <option>Select a rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              {!this.state.feedbackSent && <button className="btn btn-white" onClick={this.feedback}>Submit Feedback</button>}
              {this.state.feedbackSent && <button className="btn btn-white" disabled>Feedback Sent</button>}
              <form>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserPage;
