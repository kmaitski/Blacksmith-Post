import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import UserEntry from './UserEntry.jsx';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FeedBackEntry from './FeedBackEntry.jsx';

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
    }

    this.submitFeedback = this.submitFeedback.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let thisUser = {username: this.props.user};
    $.get('/userSells', thisUser, (data) => {
      console.log('DATA SELLS->', data)
      this.setState({soldItems: data.sells});
    })
    $.get('/userBuys', thisUser, (data) => {
      this.setState({boughtItems: data.buys});
    })
    $.get('/userCurrentItems', thisUser, (data) => {
      this.setState({currentItems: data.currentItems});
    })
    $.get('/userFeedback', thisUser, (data) => {
      if (data.rating && data.feedback) {
        this.setState({
          thisUserRatings: data.rating,
          thisUserFeedback: data.feedback
        })
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
    }
    $.post('/userFeedback', feedback, (data) => {
      console.log(data);
  })
};

  render() {
    console.log(this.state.thisUserFeedback);
    return (
      <div>
        <div style={{paddingTop: "40px"}}>
          {this.state.thisUserRatings ? 
            <h2 style={{paddingLeft: "15px"}}>{this.props.user} ({this.state.thisUserRatings[0].rating}<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Star_icon-72a7cf.svg/32px-Star_icon-72a7cf.svg.png" />)</h2> :
            <h2 style= {{paddingLeft: "15px"}}>{this.props.user} (0<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Star_icon-72a7cf.svg/32px-Star_icon-72a7cf.svg.png" />)</h2>
          }
          <div className="card text-white text-center bg-dark mb-3" style={{width: "100%", align: "center"}}>
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
            >
            </textarea>
            <p>Rating</p>
            <select
              className="user-review"
              name="myRating"
              onChange={e => this.handleChange(e)}>
              <option>Select a rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            {!this.state.feedbackSent && <button className="btn btn-white" onClick={this.submitFeedback}>Submit Feedback</button>}
            {this.state.feedbackSent && <button className="btn btn-white" disabled>Feedback Sent</button>}
            <form>
            </form>
          </div>
          <div>
            <h3 style={{textDecoration: "underline"}}>Feedback</h3>
            <Grid>
              <Row>
                {this.state.thisUserFeedback ?
                this.state.thisUserFeedback.map((item) => {
                  return (
                    <Col xs ={12} sm={3} md={2} lg={3}>
                      <FeedBackEntry item={item} />
                    </Col>
                  )
                }) :
                <div>None so far . . .</div>}
              </Row>
            </Grid>
          </div>
          <div>
            <h3 style={{textDecoration: "underline", paddingLeft: "10px"}}>Currently Listed Items</h3>
            <Grid>
              <Row>
                {this.state.currentItems ?
                this.state.currentItems.map((item) => {
                  return (
                    <Col xs={12} sm={3} md={2} lg={2}>
                      <UserEntry item={item} />  
                    </Col>
                  )
                }) :
                <div>None so far . . .</div>}
              </Row>
            </Grid>
          </div>
          <div>
            <h3 style={{ textDecoration: "underline", paddingLeft: "10px" }}>Previously Sold Items</h3>
            <Grid>
              <Row>
                {this.state.soldItems ?
                this.state.soldItems.map((item) => {
                  return (
                    <Col xs={12} sm={3} md={2} lg={2}>
                      <UserEntry item={item} />
                    </Col>
                  )
                }) : 
                <div>None so far . . .</div>
                }
              </Row>
            </Grid>
          </div>
          <div>
            <h3 style={{textDecoration: "underline", paddingLeft: "10px"}}>Items Purchased</h3>
            <Grid>
              <Row>
              {this.state.boughtItems ?
              this.state.boughtItems.map((item) => {
                return (
                  <Col xs={12} sm={3} md={2} lg={2}>
                    <UserEntry item={item} />
                  </Col>
                )
              }) :
              <div>None so far . . .</div>
              }
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}
export default UserPage;
