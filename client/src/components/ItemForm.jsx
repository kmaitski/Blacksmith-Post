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
      category: '',
      subcategory: '',
      description:'',
      cost: '',
      email:'',
      condition:'',
      blacksmith:'',
      material:'',
      image:'',
    };
    this.change = this.change.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

//function that holds state based upon input data collected in form before submission
  change(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(event) {
//stores data on submission to send via ajax call
    event.preventDefault();
    var itemData = {
      name: this.state.name,
      description:this.state.description,
      category: this.state.category,
      subcategory: this.state.subcategory,
      cost: this.state.cost,
      condition:this.state.condition,
      material:this.state.material,
      image:this.state.image,
    }
    if (itemData.name && itemData.description && itemData.category && itemData.subcategory && itemData.cost && itemData.condition && itemData.material) {

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
    } else {
      alert("Please complete the items in red");

    }

  };

//form to collect data
    render () {
      return (
        <div id="formBack">
          <div className="container" id="form">
            <div className="ItemForm">

                <h1>The Black Smith Post</h1>
                <form accept="image/gif,image/jpeg">
                  <div className="form-groups">
                    {this.state.name &&
                    <label className="text-success">Item Name</label>}
                    {!this.state.name &&
                    <label className="text-danger">Item Name</label>}
                      <input className="form-control"
                      name="name"
                      type="string"
                      value={this.state.name}
                      onChange={e => this.change(e)}
                      placeholder="Name of your product..."/>
                  </div>

                  <div className="form-group">
                    {this.state.category &&
                    <label className="text-success">Category</label>}
                    {!this.state.category &&
                    <label className="text-danger">Category</label>}
                      <select className="form-control"
                      name="category"
                      value={this.state.category}
                      onChange={e => this.change(e)}>
                        <option>Select one...</option>
                        <option>Weapon</option>
                        <option>Armor</option>
                      </select>
                    {this.state.category === "Weapon" &&
                      <select className="form-control"
                       name="subcategory"
                       value={this.state.subcategory}
                       onChange={e => this.change(e)}
                       >
                         <option className="text-danger">Select weapon type</option>
                         <option>Sword</option>
                         <option>Spear</option>
                         <option>Axe</option>
                         <option>Other</option>
                      </select>
                    }
                    {this.state.category === "Armor" &&
                      <select className="form-control"
                       name="subcategory"
                       value={this.state.subcategory}
                       onChange={e => this.change(e)}
                       >
                         <option className="text-danger">Select armor type</option>
                         <option>Helmet</option>
                         <option>Suit</option>
                         <option>Shield</option>
                         <option>Other</option>
                      </select>
                    }
                  </div>
                  <div className="form-group">
                    {this.state.description &&
                    <label className="text-success">Description</label>}
                    {!this.state.description &&
                    <label className="text-danger">Description</label>}
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
                      {this.state.cost &&
                      <label className="text-success">Price</label>}
                      {!this.state.cost &&
                      <label className="text-danger">Price</label>}
                        <input className="form-control"
                        name="cost"
                        type="number"
                        value={this.state.cost}
                        onChange={e => this.change(e)}
                        placeholder="Ex. 12.99"/>
                    </div>
                    <div className="form-group col-md-6">
                      {this.state.condition &&
                      <label className="text-success">Condition</label>}
                      {!this.state.condition &&
                      <label className="text-danger">Condition</label>}
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
                    {this.state.material &&
                    <label className="text-success">Material</label>}
                    {!this.state.material &&
                    <label className="text-danger">Material</label>}
                        <select className="form-control"
                        name="material"
                        value={this.state.material}
                        onChange={e => this.change(e)}>
                          <option>Select one...</option>
                          <option>Iron</option>
                          <option>Steel</option>
                          <option>Leather</option>
                          <option>Vibranium</option>
                          <option>Paper</option>
                          <option>Other</option>
                        </select>
                    </div>
                  <div className="form-group col-md-6">
                    {this.state.image &&
                    <label className="text-success">Image</label>}
                    {!this.state.image &&
                    <label className="text-danger">Image</label>}
                      <input
                        className="form-control-file"
                        name="image"
                        type="file"
                        aria-describedby="fileHelp"
                        value={this.state.image}
                        onChange={e => this.change(e)}
                      />
                        <small id="fileHelp" className="form-text text-muted">Upload an Image</small>
                  </div>
                  <button className="btn btn-dark btn-lg btn-block" onClick={this.onSubmit}>List thee item my lord</button>
                </form>
              </div>
            </div>
          </div>

        );
      };
  };



export default ItemForm;








