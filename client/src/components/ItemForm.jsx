import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import $ from 'jquery';



class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      class:'',
      name: '',
      description:'',
      cost: '',
      email:'',
      condition:'',
      blacksmith:'',
      material:'',
      image:'',
    };

  }

//function that holds state based upon input data collected in form before submission
  change(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {
//stores data on submission to send via ajax call

    var itemData = {
      name: this.state.name,
      description:this.state.description,
      cost: this.state.cost,
      email:this.state.email,
      condition:this.state.condition,
      blacksmith:this.state.blacksmith,
      material:this.state.material,
      image:this.state.image,
    }

    $.ajax({
      url: '/api/itemForm',
 //     dataType: 'json',
      type: 'POST',
      data: itemData,
      success: function(data) {
          alert("your post is now live")
      },
      error: function(err){
        console.log('errror in ajax', err);
      }
    });

  };

//form to collect data
    render () {
      return (
        <div className="container">
          <div className="container" id="form">
            <div className="ItemForm">
                <h1>The Black Smith Post</h1>
                <form>
                  <div className="form-groups">
                    <label >Item Name</label>
                      <input className="form-control"
                      name="name"
                      type="string"
                      value={this.state.name}
                      onChange={e => this.change(e)} 
                      placeholder="Name of your product..."/>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                      <textarea className="form-control" 
                      name="description" 
                      type="string" 
                      value={this.state.description} 
                      onChange={e => this.change(e)} 
                      rows="4" 
                      placeholder="Describe what you are selling...">
                      </textarea>
                  </div>
                  <div className="form-row">
                    <div className="input col-md-6">
                      <label>Price</label>
                        <input className="form-control"
                        name="cost"
                        type="number"
                        value={this.state.cost}
                        onChange={e => this.change(e)} 
                        placeholder="Ex. 12.99"/>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Condition</label>
                        <select className="form-control" 
                        name="condition" 
                        value={this.state.condition} 
                        onChange={e => this.change(e)}>
                          <option>Select one...</option>
                          <option>Pristine</option>
                          <option>Good</option>
                          <option>Fair</option>
                          <option>Terrible</option>
                        </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Material</label>
                      <input className="form-control"
                      name="material"
                      type="string"
                      value={this.state.material}
                      onChange={e => this.change(e)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Image URL</label>
                      <input className="form-control-file" name="image" type="file" aria-describedby="fileHelp" value={this.state.image}
                      onChange={e => this.change(e)} />
                        <small id="fileHelp" className="form-text text-muted">Upload an Image</small>
                  </div>
                  <button className="btn btn-dark btn-lg btn-block" onClick={() => this.onSubmit()}>List thee item my lord</button>
                </form>
              </div>
            </div>
          </div>
        );
      };
  };



export default ItemForm;








