import React from 'react';
import $ from 'jquery';
import UserEntry from './UserEntry.jsx';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FeedBackEntry from './FeedBackEntry.jsx';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: false,
      soldItems: false,
      boughtItems: false,
      thisUserRatings: false,
      thisUserFeedback: false
    }

  }

  componentDidMount() {
    let thisUser = {username: this.props.user.local.username};
    $.get('/userSells', thisUser, (data) => {
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
          thisUserRatings: data.rating || 0,
          thisUserFeedback: data.feedback
        })
      }
    })
  }

  render() {
    console.log(this.state.thisUserFeedback);
    return (
      <div>
        <div style={{paddingTop: "50px", paddingLeft: "15px"}}>
          {this.state.thisUserRatings ?
            <h2>{this.props.user} ({this.state.thisUserRatings[0].rating}<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Star_icon-72a7cf.svg/32px-Star_icon-72a7cf.svg.png" />)</h2> : 
            <h2>{this.props.user.local.username} (0<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Star_icon-72a7cf.svg/32px-Star_icon-72a7cf.svg.png" />)</h2>
          }
          <div>
            <h3 style={{ textDecoration: "underline" }}>Feedback</h3>
            <Grid>
              <Row>
                {this.state.thisUserFeedback ?
                  this.state.thisUserFeedback.map((item) => {
                    return (
                      <Col xs={12} sm={3} md={2} lg={3}>
                        <FeedBackEntry item={item} />
                      </Col>
                    )
                  }) :
                  <div>None so far . . .</div>}
              </Row>
            </Grid>
          </div>
          <div>
            <h3 style={{ textDecoration: "underline" }}>Currently Listed Items</h3>
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
            <h3 style={{ textDecoration: "underline" }}>Previously Sold Items</h3>
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
            <h3 style={{ textDecoration: "underline" }}>Items Purchased</h3>
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
export default MyPage;