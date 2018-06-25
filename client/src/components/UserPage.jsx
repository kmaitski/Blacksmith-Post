import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: false,
      soldItems: false,
      boughtItems: false,
      thisUserRatings: false,
      thisUserFeedback: false,
      feedbackSent: false,
      myRating: '',
      myFeedback: ''
    };

    this.submitFeedback = this.submitFeedback.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let thisUser = { username: this.props.user };
    $.get('/userSells', thisUser, data => {
      this.setState({ soldItem: data.sells });
    });
    $.get('/userBuys', thisUser, data => {
      this.setState({ boughtItems: data.buys });
    });
    $.get('/userCurrentItems', thisUser, data => {
      this.setState({ currentItems: data.currentItems });
    });
    $.get('/userFeedback', thisUser, data => {
      if (data.rating && data.feedback) {
        this.setState({
          thisUserRatings: data.rating,
          thisUserFeedback: data.feedback
        });
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitFeedback() {
    this.setState({
      feedbackSent: true
    });
    var feedback = {
      username: this.props.user,
      rating: {
        user: this.props.currentUser.local.username,
        rating: Number(this.state.myRating)
      },
      feedback: {
        user: this.props.currentUser.local.username,
        message: this.state.myFeedback
      }
    };
    $.post('/userFeedback', feedback, data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4 text-white">
            {this.props.user}{' '}
            <button
              onClick={this.props.goback}
              className="btn btw-white align-right"
            >
              Back
            </button>
          </h1>
          {this.state.thisUserRatings && (
            <h2 className="display-4 text-white">
              {this.state.thisUserRatings[0].rating}
            </h2>
          )}
          <div className="card-deck">
            <div className="card text-white bg-dark mb-3">
              <h4 className="card-title">Currently Listed Items</h4>
              {!this.state.currentItems && <div>None so far . . .</div>}
              {this.state.currentItems &&
                this.state.currentItems.map(item => <div>{item.name}</div>)}
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title">Sold items</h4>
              {!this.state.soldItems && <div>None so far . . .</div>}
              {this.state.soldItems &&
                this.state.soldItems.map(item => <div>{item.item}</div>)}
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title">Purchased items</h4>
              {!this.state.boughtItems && <div>None so far . . .</div>}
              {this.state.boughtItems &&
                this.state.boughtItems.map(item => <div>{item.item}</div>)}
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title">User Reviews</h4>
              {!this.state.thisUserFeedback && <div>None so far . . .</div>}
              {this.state.thisUserFeedback &&
                this.state.thisUserFeedback.map(review => (
                  <div>
                    {review.user} : {review.message}
                  </div>
                ))}
            </div>
            <div className="card text-white text-center bg-dark mb-3">
              <h4 className="card-title"> Give Feedback</h4>
              <p>Review</p>
              <textarea
                className="user-feedback"
                name="myFeedback"
                type="string"
                value={this.state.myFeedback}
                onChange={e => this.handleChange(e)}
                rows="3"
                placeholder="..."
              />
              <p>Rating</p>
              <select
                className="user-review"
                name="myRating"
                onChange={e => this.handleChange(e)}
              >
                <option>Select a rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              {!this.state.feedbackSent && (
                <button className="btn btn-white" onClick={this.submitFeedback}>
                  Submit Feedback
                </button>
              )}
              {this.state.feedbackSent && (
                <button className="btn btn-white" disabled>
                  Feedback Sent
                </button>
              )}
              <form />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserPage;
