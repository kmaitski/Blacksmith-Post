import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody } from 'reactstrap';

const MeetTeam = (props) => {
  return (
    <div>
      <p className="about-text" style={{marginTop:'50px', marginTop:'50px'}}>  __________________________________________________________________</p>
      <h1 className="about-text">BlackSmithPost</h1>
      <h4 className="about-text" style={{marginLeft:'50px', marginRight:'50px'}}>A marketplace for blacksmiths to showcase their mastery and provide one of kind creations to the world!
                         We want to support our local smithies and keep this age old craft of at least like 100 years alive.
                         So fire up the furnace and experience the market as the ancients did!</h4>
                         <p className="about-text" style={{marginTop:'50px', marginTop:'50px'}}>  __________________________________________________________________</p>
      <h1 className="about-text">Meet the Team</h1>    
      <div>
        <div className="row">
        <div className="col">
            <img className="mx-auto rounded-circle aboutpic" top width="50%" src="https://avatars0.githubusercontent.com/u/18523373?s=460&v=4" alt="Maitski" />
              <h4 className="about-text">Kevin Maitski</h4>
                <p className="about-text">Product Owner</p>
          </div>
          <div className="col">
            <img className="mx-auto rounded-circle aboutpic" top width="50%" src="https://avatars1.githubusercontent.com/u/34389837?s=460&v=4" alt="Doddy" />
            <h4 className="about-text">Kevin Doddy</h4>
              <p className="about-text">Scrum Master</p>
          </div>
          <div className="col">
            <img className="mx-auto rounded-circle aboutpic" top width="50%" src="https://avatars0.githubusercontent.com/u/4923066?s=460&v=4" alt="Moxie" />
            <h4 className="about-text">Ryan Morrow</h4>
              <p className="about-text">Lead Engineer</p>
          </div>
          <div className="col">
            <img className="mx-auto rounded-circle aboutpic" top width="50%" src="https://avatars1.githubusercontent.com/u/24405162?s=460&v=4" alt="Sam" />
            <h4 className="about-text">Sam Donner</h4>
              <p className="about-text">Lead Engineer</p>
          </div>
        </div> 
    </div> 
      
    

    
         
    </div>
  );
};


export default MeetTeam;